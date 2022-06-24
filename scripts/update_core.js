const fs = require('fs');
const core = require('../src/maps/core.json');

let treatyIncome = 0;

Object.values(core.cityTable).map(city => {
  treatyIncome += 10 * city.treatyPort * (1 + city.population / 10000) * 12;
});

console.log(treatyIncome);

//fs.writeFileSync('../src/maps/core.json', JSON.stringify(core, null, 2));
