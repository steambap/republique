import { IFaction } from "./faction";
import { CityTable, City, CityTypeData } from "./main_map";

const baseTarrif = 10;

export function getSupplyIncome(faction: IFaction, cityTable: CityTable): number {
  const { id } = faction;
  let income = 0;
  Object.values(cityTable).forEach(city => {
    if (city.owner === id) {
      income += city.population / 12;
    }
  });

  return income;
}

export function getGoldIncome(faction: IFaction, cityTable: CityTable): number {
  const { id } = faction;
  let saltTax = 0;
  let salesTax = 0;
  let tarrif = 0;

  Object.values(cityTable).forEach(city => {
    if (city.owner !== id) {
      return;
    }
    const tradeModifier = CityTypeData[city.cityType].trade;
    saltTax += city.population / 24;
    salesTax += City.currentTrade(city) * (1 + tradeModifier / 10) / 12;
    tarrif += baseTarrif * city.treatyPort * (1 + city.population / 10000) * tradeModifier;
  });

  return saltTax + salesTax + tarrif;
}
