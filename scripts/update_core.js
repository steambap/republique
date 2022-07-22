const fs = require('fs');
const core = require('../src/maps/core.json');

Object.values(core.cityTable).map(city => {
  if (city.posX) {
    city.x = 0;
    city.y = 0;
    delete city.posX;
    delete city.posY;
  }
});

fs.writeFileSync('../src/maps/core.json', JSON.stringify(core, null, 2));
