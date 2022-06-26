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

export function formatNumber(n: number): string {
  if (Math.trunc(Math.abs(n) / 1000) >= 1) {
    return Math.trunc(Math.abs(n) / 1000).toString() + "k";
  } else if (Math.abs(n) < 100) {
    if ((n - Math.trunc(n)) < 0.001) {
      return n.toFixed(0);
    } else {
      return n.toFixed(2);
    }
  } else {
    return n.toFixed(0);
  }
}

export function formatIncome(n: number): string {
  if (n < 0) {
    return formatNumber(n);
  }

  return `+${formatNumber(n)}`;
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

export function getInfluenceIncome(faction: IFaction, cityTable: CityTable): number {
  const { id } = faction;

  let influence = 0;
  Object.values(cityTable).forEach(city => {
    if (city.owner !== id) {
      return;
    }

    influence += city.politicalPt;
  });

  return influence;
}

const fib = [1,2,3,5,8,13,21,34];

export function getActionPoint(faction: IFaction, cityTable: CityTable): number {
  const { id } = faction;

  let political = 0;
  Object.values(cityTable).forEach(city => {
    if (city.owner !== id) {
      return;
    }

    political += city.politicalPt;
  });

  let ap = 1;
  for (let i = 0;i < fib.length;i++) {
    if (political >= fib[i]) {
      ap += 1;
    } else {
      break;
    }
  }

  return ap;
}
