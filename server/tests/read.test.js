const CSVManager = require('../src/CSVManager');

test('read data and get it back', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.data;

    expect(data).toHaveLength(29);
});

test('read data and get headers', async () => {
    const csvMng = new CSVManager(__dirname + "/test-track.csv");
    await csvMng.read();
    const data = csvMng.headers;

    expect(data).toHaveLength(1);
});

