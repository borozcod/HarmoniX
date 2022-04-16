// class LoadCSV

class CSVManager {
    constructor(path) {
        this.data = [];
        this.path = path;
        this.read();
    }

    set data(newData) {
        this.data = newData;
    }

    get data() {
        return this.data;
    }

    read() {
        console.log('reading');
    }
}

module.exports = CSVManager;