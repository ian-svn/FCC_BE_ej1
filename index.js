var express = require('express');
var app = express();

// Configurar el motor de plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  const currentTime = {
    unix: Date.now(),
    utc: new Date().toUTCString()
  };
  
  res.render('index', { 
    currentTime: JSON.stringify(currentTime, null, 2),
    exampleTime: JSON.stringify({
      unix: 1451001600000,
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
    }, null, 2)
  });
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
