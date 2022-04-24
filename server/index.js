const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'files/' })
const CSVManager = require('./src/CSVManager');
const bodyParser = require('body-parser')

const csvMng = new CSVManager(__dirname + "/files/tracks.csv");
csvMng.read().then(()=> {
  console.log("added in memory");
})

var app = express()
var port = 8080

app.use(cors())
app.use(bodyParser.json())

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


app.post('/update', async function(req,res){

  const form = req.body;

  //console.log(form);
  //console.log(form.id);
  csvMng.update(form);

  res.sendStatus(200);
})

app.get('/update-csv', function(req,res){

  const testObject = {
    id: '0BRXJHRNGQ3W4v9frnSfhu',
    name: 'Ave Marioaa',
    popularity: '089',
    duration_ms: '178933',
    explicit: '0',
    artists: "['Dick Haymes']",
    id_artists: "['3BiJGZsyX9sJchTqcSA7Su']",
    release_date: '1922',
    danceability: '0.227',
    energy: '0.261',
    key: '5',
    loudness: '-12.343',
    mode: '1',
    speechiness: '0.0382',
    acousticness: '0.994',
    instrumentalness: '0.247',
    liveness: '0.0977',
    valence: '0.0539',
    tempo: '118.891',
    time_signature: '4'
  }

  csvMng.update(testObject);
  csvMng.updateCSV()

  res.sendStatus(200)
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})