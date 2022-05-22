const fs = require('fs');
const path = require('path');
const readline = require('readline');
const FileManager = require('./FileManager');


class JSONManager extends FileManager{
    /** @constructs */
    constructor(file="") {
        super(file)
    }

    /**
     * Read the csv and store it in memory as an array. The promise is resolved once the entire file is read
     *
     * @return {Promise} 
     * @memberof JSONManager
     */
    read() {
       
    }

    /**
     * Backup the file provided to JSONManager and add current timestamp. The file extension will be kept the same
     * @param {String} timestamp - the timestamp appended to the end of the filename
     * @return {Promise} 
     * @memberof JSONManager
     */
    async backup(timestamp = Date.now()) {
        
    }

    /**
     * Given a coma separated string, this function will split it into an array.
     * The regex ignores commas found inside of ""
     *
     * @return {Array} 
     * @memberof JSONManager
     */
    parse(line) {
   
    }

    /**
     * Linear search of all the rows and returns the matches for a specified column
     * @param {String} key - The column of the csv you would like to search
     * @param {String} value - The value you are searching for
     * @return {Array} 
     * @memberof JSONManager
     */
    search(key, value, id = 0) {}

    update(row){}
	
	delete_row(row){}
	
	add_row(row){}
}

Object.assign(JSONManager.prototype, isCSV);

module.exports = JSONManager;