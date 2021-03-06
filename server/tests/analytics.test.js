const CSVManager = require('../src/CSVManager');

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
  });

test('test danceability analytic', async () => {

    const file = __dirname + "/test-track.csv";
    const csvMng = new CSVManager(file);
    await csvMng.read();

    const danceabilityDistribution = csvMng.distribution("danceability");

    // [0.1, 0.2, .3, .4 , .5, .6, .7, .8, .9, 1]
    expect(danceabilityDistribution).toHaveLength(10);
    expect(danceabilityDistribution[3]).toBeWithinRange(20, 23);
});
