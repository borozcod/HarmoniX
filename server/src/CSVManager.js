const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * This class requires you to provide the csv file you would like to parse.
 *
 * @class CSVManager
 */
class CSVManager {
    /** @constructs */
    constructor(file="") {
        this.headers = [];
        this.data = [];
        this.file = file;
    }

    /**
     * Getter for the data
     *
     * @return {Array} 
     * @memberof CSVManager
     */
    getData() {
        return this.data;
    }
    /**
     * Getter for the headers
     *
     * @return {Array} 
     * @memberof CSVManager
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * Read the csv and store it in memory as an array. The promise is resolved once the entire file is read
     *
     * @return {Promise} 
     * @memberof CSVManager
     */
    read() {
        return new Promise((resolve, reject) => {
            this.data = [];

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
                        loudness: parsedData[11], 
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

    /**
     * Backup the file provided to CSVManager and add current timestamp. The file extension will be kept the same
     * @param {String} timestamp - the timestamp appended to the end of the filename
     * @return {Promise} 
     * @memberof CSVManager
     */
    async backup(timestamp = Date.now()) {
        // See if the file exists
        return new Promise((resolve, reject) => {

            fs.access(this.file, fs.constants.F_OK, async (err) => {
                if (err){
                    reject(`${file} does not exist`);
                    return;
                }

                // Get the file information
                const filename = path.parse(this.file).name;
                const ext = path.parse(this.file).ext;


                fs.copyFile(this.file, `${__dirname}/../backup/${filename}-${timestamp}${ext}`, (err) => {
                    if (err){
                        reject(`failed to copy ${this.file}. ${err}`);
                        return;
                    }
                    resolve('file copied');
                });

            });
        })
    }

    /**
     * Given a coma separated string, this function will split it into an array.
     * The regex ignores commas found inside of ""
     *
     * @return {Array} 
     * @memberof CSVManager
     */
    parse(line) {
        var regex = /(?:"[^"]+")|[^,]+/g;
        var line1 = new String(line);
        var found = line1.match(regex);
        return found;
    }

    /**
     * Linear search of all the rows and returns the matches for a specified column
     * @param {String} key - The column of the csv you would like to search
     * @param {String} value - The value you are searching for
     * @return {Array} 
     * @memberof CSVManager
     */
    search(key, value) {
        const matches = [];
        this.data.forEach(element => {
            //if(element[key] === value) {
            const track_value = element[key].toLowerCase()
            value = value.toLowerCase()
            if (track_value.indexOf(value) !== -1) {
                matches.push(element);
            }
        });

        return matches;
    }
    update(row){
        this.data.forEach(element=>{
            if(element.id === row.id){
                const index = this.data.indexOf(element);
                this.data[index] = row;
                console.log('updated song');
            }
        })
    }
	
	delete_row(row){
		this.data.forEach(element=>{
			if(element.id === row.id){
				const index = this.data.indexOf(element);
				this.data.splice(index, 1);
				console.log('deleted song');
			}
		})
	}
	
	add_row(row){
		this.data.push(row)
		console.log('added song');
	}


    /**
     * Update the csv file by overwriting the old csv.
     * Before we try and overwriting the csv, we make a backup of the current csv
     *
     * @memberof CSVManager
     */
    updateCSV() {
        this.backup();

        var csvString = '';
        csvString += this.headers.join(',');

        this.data.forEach(rows=>{
            csvString += '\n';
            csvString += Object.values(rows).join(',');
        });
        // if this get's to long we can try and us appendFileSync
        fs.writeFileSync(this.file, csvString);
    }

    /**
     * Reads through data set and returns the percentile distribution for any given column
     * @param {String} colName - The column of the csv you would like to search
     * @return {Array} 
     * @memberof CSVManager
     */
    distribution(colName) {

        var occurrences = [0,0,0,0,0,0,0,0,0,0]
        const arrSize = this.data.length;

        this.data.forEach( row => {
            const colVal = parseFloat(row[colName])
            if (colVal <= 0.1) {
                occurrences[0]++;
            }
            else if (colVal > 0.1 && colVal <= 0.2) {
                occurrences[1]++;
            }
            else if (colVal > 0.2 && colVal <= 0.3) {
                occurrences[2]++;
            }
            else if (colVal > 0.3 && colVal <= 0.4) {
                occurrences[3]++;
            }
            else if (colVal > 0.4 && colVal <= 0.5) {
                occurrences[4]++;
            }
            else if (colVal > 0.5 && colVal <= 0.6) {
                occurrences[5]++;
            }
            else if (colVal > 0.6 && colVal <= 0.7) {
                occurrences[6]++;
            }
            else if (colVal > 0.7 && colVal <= 0.8) {
                occurrences[7]++;
            }
            else if (colVal > 0.8 && colVal <= 0.9) {
                occurrences[8]++;
            }
            else if (colVal > 0.9 && colVal <= 1) {
                occurrences[9]++;
            }
        })

        var divided = [0,0,0,0,0,0,0,0,0,0] 
        for(var i = 0; i < occurrences.length; i++){
            divided[i] = occurrences[i]/arrSize * 100;
        }

        return divided;

    }

/*     percentRank(array, n) {
        var L = 0;
        var S = 0;
        var N = array.length
    
        for (var i = 0; i < array.length; i++) {
            if (array[i] < n) {
                L += 1
            } else if (array[i] === n) {
                S += 1
            } else {
    
            }
        }
    
        var pct = (L + (0.5 * S)) / N
    
        return pct
    } */
}

module.exports = CSVManager;