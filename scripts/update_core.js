const fs = require('fs');
const core = require('../src/maps/core.json');

Object.values(core.cityTable).forEach(city => {
  if (!city.population) {
    throw "no pop";
  }
  city.tradePt = 0;
  delete city.supplyPt;
  city.politicalPt = 0;
  city.cityType = "tundra";
  city.level = 0;
  city.depleted = false;
  city.depletion = 0;
  city.buildings = [];
});

Object.values(core.factionTable).forEach(faction => {
  faction.reformPt = 0;
});

fs.writeFileSync('../src/maps/core.json', JSON.stringify(core, null, 2));
