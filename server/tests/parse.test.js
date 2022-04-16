const CSVManager = require('../src/CSVManager');

test('parse data', () => {
    var line = "4CbSH52H25b1Qi25zQPB6j,Indian Summer - Instrumental,14,152333,0,\"['Miles Davis', 'Lee Konitz']\",\"['0kbYTNQb4Pb1rPbbaF0pT4', '4YNvbaOaqp5pzC5US5t48k']\",1951-10-05,0.651,0.115,10,-15.494,1,0.0814,0.995,0.825,0.184,0.47,82.531,4";
    const csvMng = new CSVManager();
    const parsed = csvMng.parse(line);
    expect(parsed).toHaveLength(20);
});
