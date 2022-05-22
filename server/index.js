const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'files/' })
const CSVManager = require('./src/CSVManager');
const CSVManager = require('./src/DataAnalyzer');
const bodyParser = require('body-parser')

const csvMngTracks = new CSVManager(__dirname + "/files/tracks-small.csv");
const csvMngArtist = new CSVManager(__dirname + "/files/artists.csv");
const dataAnalyzer = new DataAnalyzer();

csvMngTracks.read().then(()=> {
  console.log("added tracks in memory");
})

csvMngArtist.read('artist').then(()=> {
  console.log("added artist in memory");
})

var app = express()
var port = 8080

var searchList = [];
var searchIndex = 0;

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/artist', function (req, res) {
  
  const pageSize = 10000;
  const {start = 0, limit = pageSize} = req.query;

  const data = csvMngArtist.data.slice(start, limit);
  if(data.length < pageSize){
    data.push({
      nextPage: null
    })
  } else {
    data.push({
      nextPage: `http://localhost:8080/artist?start=${limit}&limit=${parseInt(limit) + pageSize}`
    })
    
  }

  res.send(data)
})

app.get('/search-list', function (req, res) {
	res.send(searchList);
})

app.get('/search', function (req, res) {
  const {value, key, id = false} = req.query

  if (fs.existsSync(__dirname + `/saved-search/search-${id}.json`) && id) {

    let savedData = fs.readFileSync(__dirname + `/saved-search/search-${id}.json`);

    let searchData = JSON.parse(savedData);
    res.send(searchData);
  } else {
    const data = csvMngTracks.search(key, value, searchIndex);

    searchList.push(`Search #${searchIndex}`);
    searchIndex++;

    res.send(data);
  }
})

app.post('/import', upload.single('csv'), async function (req, res) {
  const file = req.file;
  const newCSV = new CSVManager(file.path);

  await newCSV.read();
  if(!(newCSV.getHeaders().toString() === csvMngTracks.getHeaders().toString())) {
    res.sendStatus(401);
    return;
  }

  await csvMngTracks.backup();

  fs.renameSync(file.path, __dirname + '/files/tracks-small.csv');

  res.sendStatus(200);
})


app.post('/update', async function(req,res){

  const form = req.body;

  //console.log(form);
  //console.log(form.id);
  csvMngTracks.update(form);
  csvMngTracks.updateCSV()

  res.sendStatus(200);
})

app.post('/delete', async function(req,res){

  const form = req.body;

  //console.log(form);
  console.log(form.id);
  csvMngTracks.delete_row(form);
  csvMngTracks.updateCSV()

  res.sendStatus(200);
})

app.post('/add', async function(req,res){

  const form = req.body;

  //console.log(form);
  console.log(form.id);
  csvMngTracks.add_row(form);
  csvMngTracks.updateCSV()

  res.sendStatus(200);
})

app.get('/distribution', function (req, res) {
  const {colName, searchID = false} = req.query

  if (fs.existsSync(__dirname + `/saved-search/search-${searchID}.json`) && searchID) {
    let savedData = fs.readFileSync(__dirname + `/saved-search/search-${searchID}.json`);

    let searchData = JSON.parse(savedData);
    
    const data = dataAnalyzer.distribution(colName, searchData);
    res.send(data);
  } else {
    const data = dataAnalyzer.distribution(colName, csvMngTracks.data);
    res.send(data);
  }
})

app.get('/genres', function (req, res) {
  const {colName = 'genres'} = req.query;

  const data = dataAnalyzer.genreCount(colName, csvMngArtist.data);

	res.send(data);
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})