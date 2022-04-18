var express = require('express')
var cors = require('cors')
const CSVManager = require('./src/CSVManager');
const csvMng = new CSVManager(__dirname + "/files/tracks.csv");
csvMng.read().then(()=> {
  console.log("added");
})


var app = express()
var port = 8080

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})