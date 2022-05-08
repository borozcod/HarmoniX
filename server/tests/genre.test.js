const CSVManager = require('../src/CSVManager');


test('test genre analytic', async () => {

    // const objGenre = {};
    // !objGenre['pop']
    // -> objGenre['pop'] = 0
    // else objGenre['pop']++

    // loop each artist
    //  -> for each genre, (you might need JSON.parse) or regex
    //      -> objGenre[genre]++;

    const file = __dirname + "/test-artists.csv";
    const csvMng = new CSVManager(file);
    await csvMng.read('artist');

    const genres = csvMng.genreCount('genres')
    expect(genres).toHaveLength(400);

});
