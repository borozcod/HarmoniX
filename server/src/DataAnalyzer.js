const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * This class is used to provide data analytics
 *
 * @class DataAnalyzer
 */

class DataAnalyzer {

    /**
     * Reads through data set and returns the percentile distribution for any given column
     * @param {String} colName - The column of the csv you would like to search
     * @param {Array} data - The dataset to run the analytics on
     * @return {Array} 
     * @memberof DataAnalyzer
     */
     distribution(colName, data) {
        const fs = require('fs');


        var occurrences = [0,0,0,0,0,0,0,0,0,0]
        const arrSize = data.length;

        data.forEach( row => {
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

        const jsonData = JSON.stringify(divided);
        fs.writeFile('pie_data.json', jsonData, function(err){
            if (err){
                console.log(err);
                //return;
            }
        });

        return divided;

    }

    /**
     * Reads through a set of data and returns the total count of occurrences for each genre
     * @param {String} colName - The column of the csv you would like to search
     * @param {Array} data - The dataset to run the analytics on
     * @return {Array} 
     * @memberof DataAnalyzer
     */
    genreCount(colName, data){
        var regex = /(?:'[^']+')/g;

        const objGenre = {};

        data.forEach( row => {
            var line1 = new String(row[colName]);
            var found = line1.match(regex);

            if (found) {
                found.forEach(g => {
                    if (objGenre[g]){
                        objGenre[g]++;
                    }
                    else {
                        objGenre[g] = 1;
                    }
                })
            }
        })

        return objGenre;

    }
}

module.exports = DataAnalyzer;