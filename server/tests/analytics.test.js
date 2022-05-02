const CSVManager = require('../src/CSVManager');

test('test danceability analytic', () => {

    const file = __dirname + "/test-track.csv";
    const csvMng = new CSVManager(file);

    const danceabilityDistribution = csvMng.distribution("danceability");

    // [0.1, 0.2, .3, .4 , .5, .6, .7, .8, .9, 1]
    expect(danceabilityDistribution).toHaveLength(10);
    expect(danceabilityDistribution[2]).toBeWithinRange(0.205, 0.208);
});
