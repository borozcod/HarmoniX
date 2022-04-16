// class LoadCSV

class CSVManager {
    constructor(file="") {
        this.data;
        this.file = file;
    }

    read() {
        console.log('reading');
    }

    parse(line) {
        var regex = /(?:"[^"]+")|[^,]+/g;
        var line1 = new String(line);
        var found = line1.match(regex);
        return found;
    }
}

module.exports = CSVManager;