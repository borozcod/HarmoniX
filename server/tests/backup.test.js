const fs = require('fs');
const path = require('path');
const CSVManager = require('../src/CSVManager');

test('backup file', async () => {

    const file = __dirname + "/../files/tracks.csv";
    const filename = path.parse(file).name;
    const ext = path.parse(file).ext;
    const timestamp = Date.now();


    const csvMng = new CSVManager(file);

    await csvMng.backup(timestamp);

    const exist = fs.existsSync(`${__dirname}/../backup/${filename}-${timestamp}${ext}`);
    expect(exist).toBe(true);
});
