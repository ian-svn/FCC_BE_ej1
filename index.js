var express = require('express');
var app = express();
var cors = require('cors');

// Habilitar CORS para todas las rutas
app.use(cors({optionsSuccessStatus: 200}));

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta de la API
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // Si no hay fecha, usar la fecha actual
  if (!dateString) {
    date = new Date();
    return res.json({
      unix: Number(date.getTime()),
      utc: date.toUTCString()
    });
  }

  // Verificar si es un timestamp numérico
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  // Verificar si la fecha es válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver la fecha en el formato requerido
  return res.json({
    unix: Number(date.getTime()),
    utc: date.toUTCString()
  });
});

// Iniciar el servidor
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
