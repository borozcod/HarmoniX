const CSVManager = require('../src/CSVManager');
const DataAnalyzer = require('../src/DataAnalyzer');

test('test genre analytic', async () => {

    const file = __dirname + "/test-artists.csv";
    const csvMng = new CSVManager(file);
    const dataAnalyzer = new DataAnalyzer();
    await csvMng.read('artist');

    const genres = dataAnalyzer.genreCount('genres', csvMng.data);
    expect(genres["'pop'"]).toEqual(5);

});
