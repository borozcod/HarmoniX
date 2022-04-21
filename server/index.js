var express = require('express')
var cors = require('cors')
const CSVManager = require('./src/CSVManager');
const csvMng = new CSVManager(__dirname + "/files/tracks.csv");
csvMng.read().then(()=> {
  console.log("added in memory");
})

var app = express()
var port = 8080

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/search', function (req, res) {
  const {value, key} = req.query
  const data = csvMng.search(key, value);
	res.send(data);
})

app.post('/import', function (req, res) {
  console.log(req);
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})