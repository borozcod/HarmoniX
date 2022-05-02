const CSVManager = require('../src/CSVManager');

test('search for track nae and count number of results', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.search('name', 'Carve');

    expect(data).toHaveLength(1);
});


test('search for track name, check if results match', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.search('name', 'Carve');

    expect(data[0]['name']).toEqual('Carve');
});


test('search for artist name, check if resulting array has correct length', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.search('artists', 'Fernando');

    expect(data).toHaveLength(9);
});


test('search for artist, check if resulting array has correct artists', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.search('artists', 'Fernando');

    expect(data[0]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[1]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[2]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[3]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[4]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[5]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[6]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[7]['artists']).toEqual("['Fernando Pessoa']");
    expect(data[8]['artists']).toEqual("['Fernando Pessoa']");
});
