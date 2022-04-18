var express = require('express')
var cors = require('cors')

var app = express()
var port = 8080

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/search', function (req, res) {
	res.send([
    {
        "id": 1,
        "name": "TEST",
        "popularity": 10,
        "duration_ms":10000,
        "explicit": 2000,
        "artists": "abc", 
        "id_artists":123456, 
        "release_date":45678, 
        "danceability":5, 
        "energy":5, 
        "key":4, 
        "loudness":65, 
        "mode":78, 
        "speechiness":56, 
        "acousticness":89, 
        "instrumentalness":78, 
        "liveness":10, 
        "valence":10, 
        "temp": 56, 
        "time_signature": 6

    }
])
})

app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
})