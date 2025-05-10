var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
    return res.json({
      unix: Number(date.getTime()),
      utc: date.toUTCString()
    });
  }

  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: Number(date.getTime()),
    utc: date.toUTCString()
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
