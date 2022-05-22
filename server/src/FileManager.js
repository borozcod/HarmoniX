
class FileManager {
    constructor(file="") {
        this.file = file;
        this.data = [];
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

    read() {}
    backup() {}
    parse() {}
    search() {}
    update() {}
}

module.exports = FileManager;