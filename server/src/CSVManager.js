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

            const rl = readline.createInterface({
                input: fs.createReadStream(this.file)
            });

            var headers = true;

            rl.on('line', (line) => {
                const parsedData = this.parse(line);
                if(headers){
                    this.headers.push(parsedData);
                    headers = false;
                }else{
                    this.data.push(parsedData);
                }
            }).on('close', () => {
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
}

module.exports = CSVManager;