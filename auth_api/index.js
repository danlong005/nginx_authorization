const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/v1/validate', (req, res) => {
  var token = req.header('Authorization').replace("Bearer ", "");
  console.log("here i am")
  jwt.verify(token, "shoosh", (error, decoded) => {
    console.log("now i am here")
    if (error) {
      res.status(401).send();
    } else {
      res.status(200).send();
    }
  });
});

app.post('/v1/token', (req, res) => {
  var token = jwt.sign({
    something: "yep"
  }, "shoosh");

  res.status(201).json({
    access_token: token
  });
});

app.listen(3000, (req, res) => {
  console.log("starting the application");
});