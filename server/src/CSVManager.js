// class LoadCSV
const fs = require('fs');
const readline = require('readline');

class CSVManager {
    constructor(file="") {
        this.headers = [];
        this.data = [];
        this.file = file;
    }

    getData() {
        return data;
    }

    read() {
        return new Promise((resolve, reject) => {
            this.data = [];

            // if (fs.existsSync(__dirname + '/../files/tracks.json') && fs.existsSync(__dirname + '/../files/headers.json')) {
            //     this.data = JSON.parse( fs.readFileSync(__dirname + '/../files/tracks.json').toString().split("\n"))
            //     this.headers = JSON.parse(fs.readFileSync(__dirname + '/../files/headers.json').toString().split("\n"));

            //     resolve();

            //     return;
            // }

            const rl = readline.createInterface({
                input: fs.createReadStream(this.file)
            });

            var headers = true;

            rl.on('line', (line) => {
                const parsedData = this.parse(line);
                if(headers){
                    this.headers = parsedData;
                    headers = false;
                }else{
                    const obj = {
                        id: parsedData[0],
                        name: parsedData[1], 
                        popularity: parsedData[2], 
                        duration_ms: parsedData[3], 
                        explicit: parsedData[4], 
                        artists: parsedData[5], 
                        id_artists: parsedData[6], 
                        release_date: parsedData[7], 
                        danceability: parsedData[8], 
                        energy: parsedData[9], 
                        key: parsedData[10], 
                        loudness: parsedData[1], 
                        mode: parsedData[12], 
                        speechiness: parsedData[13], 
                        acousticness: parsedData[14], 
                        instrumentalness: parsedData[15], 
                        liveness: parsedData[16], 
                        valence: parsedData[17], 
                        tempo: parsedData[18], 
                        time_signature: parsedData[19]
                    }
                    this.data.push(obj);
                }
            }).on('close', () => {
                fs.writeFile(__dirname + '/../files/tracks.json', JSON.stringify(this.data), (err) => {
                    if (err) throw err;
                });
                fs.writeFile(__dirname + '/../files/headers.json', JSON.stringify(this.headers), (err) => {
                    if (err) throw err;
                });
                resolve();
            });
        });
    }

    parse(line) {
        var regex = /(?:"[^"]+")|[^,]+/g;
        var line1 = new String(line);
        var found = line1.match(regex);
        return found;
    }

    search(key, query) {
        const matches = [];
        this.data.forEach(element => {
            if(element[key] === query) {
                matches.push(element);
            }
        });

        return matches;
    }
}

module.exports = CSVManager;