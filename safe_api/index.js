const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Super Protected"    
  });
});

app.listen(3001, (req, res) => {
  console.log("starting application");
})