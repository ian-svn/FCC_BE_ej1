var express = require('express');
var app = express();
var path = require('path');

// Configurar el motor de plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  optionsSuccessStatus: 200
}));  

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/api/current-time", function (req, res) {
  const currentTime = {
    unix: Date.now(),
    utc: new Date().toUTCString()
  };
  res.json(currentTime);
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let response;

  if (!date) {
    // Si no hay fecha, usar la fecha actual
    response = {
      unix: Date.now(),
      utc: new Date().toUTCString()
    };
  } else {
    // Verificar si es un timestamp numérico
    if (!isNaN(date)) {
      date = parseInt(date);
    }
    
    const dateObj = new Date(date);
    
    if (dateObj.toString() === "Invalid Date") {
      response = { error: "Invalid Date" };
    } else {
      response = {
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString()
      };
    }
  }
  
  res.json(response);
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
