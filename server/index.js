const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'files/' })
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

app.post('/import', upload.single('csv'), async function (req, res) {
  const file = req.file;
  const newCSV = new CSVManager(file.path);

  await newCSV.read();
  if(!(newCSV.getHeaders().toString() === csvMng.getHeaders().toString())) {
    res.sendStatus(401);
    return;
  }

  await csvMng.backup();

  fs.renameSync(file.path, __dirname + '/files/tracks.csv');

  res.sendStatus(200);
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})