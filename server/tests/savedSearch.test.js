const fs = require('fs');
const path = require('path');
const CSVManager = require('../src/CSVManager');

test('saved search check', async () => {

    const file = __dirname + "/test-track.csv";
    const csvMng = new CSVManager(file);
    
    await csvMng.search("popularity", 0, 0);

    const fileCheck = fs.existsSync(__dirname + `/../saved-search/search-0.json`)

    expect(fileCheck).toBe(true);
});
