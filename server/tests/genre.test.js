const CSVManager = require('../src/CSVManager');


test('test genre analytic', async () => {

    const file = __dirname + "/test-artists.csv";
    const csvMng = new CSVManager(file);
    await csvMng.read('artist');

    const genres = csvMng.genreCount('genres')
    expect(genres["'pop'"]).toEqual(5);

});
