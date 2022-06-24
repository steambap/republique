export type CityType = "tundra"
  | "black_soil"
  | "black_soil_city"
  | "urban"
  | "city"
  | "town"
  | "basin"
  | "basin_city"
  | "steppe"
  | "mountain"
  | "port_city"
  | "hill_city"
  | "minority"
  | "jungle"
  | "desert_city"

export interface ICityTypeData {
  displayName: string;
  supply: number;
  trade: number;
  slot: number;
}

export interface IBuilding {
  posX: number;
  posY: number;
  damage: number;
}

export interface ICity {
  name: string;
  posX: number;
  posY: number;
  id: string;
  owner: string;
  tradePt: number;
  police: number;
  population: number;
  politicalPt: number;
  cityType: CityType;
  level: number;
  depleted: boolean;
  depletion: number;
  buildings: IBuilding[];
  treatyPort: number;
}

export type CityTable = Record<string, ICity>;

export interface edgeCost {
  cost: number;
}

export type TEdges = Record<string, Record<string, edgeCost>>;

function currentTrade(city: ICity) {
  return Math.trunc((city.tradePt * city.police) / 100);
}

export const City = {
  currentTrade,
};

export function getTotalPop(factionID: string, cityTable: CityTable): number {
  let pop = 0;
  Object.values(cityTable).forEach(city => {
    if (city.owner === factionID) {
      pop += city.population;
    }
  });

  return pop;
}

export const CityTypeData: Record<CityType, ICityTypeData> = {
  "tundra": {
    displayName: "冻土",
    supply: 1,
    trade: 0,
    slot: 0,
  },
  "black_soil": {
    displayName: "黑土地",
    supply: 6,
    trade: 0,
    slot: 0,
  },
  "black_soil_city": {
    displayName: "黑土地城市",
    supply: 6,
    trade: 1,
    slot: 2,
  },
  "urban": {
    displayName: "都市",
    supply: 1,
    trade: 6,
    slot: 3,
  },
  "city": {
    displayName: "城市",
    supply: 3,
    trade: 3,
    slot: 2,
  },
  "town": {
    displayName: "城镇",
    supply: 4,
    trade: 1,
    slot: 1,
  },
  "basin": {
    displayName: "盆地",
    supply: 3,
    trade: 1,
    slot: 0,
  },
  "basin_city": {
    displayName: "盆地城市",
    supply: 3,
    trade: 2,
    slot: 1,
  },
  "steppe": {
    displayName: "大漠",
    supply: 2,
    trade: 2,
    slot: 0,
  },
  "port_city": {
    displayName: "港口城市",
    supply: 2,
    trade: 4,
    slot: 2,
  },
  "hill_city": {
    displayName: "山城",
    supply: 2,
    trade: 1,
    slot: 1,
  },
  "mountain": {
    displayName: "山地",
    supply: 1,
    trade: 0,
    slot: 0,
  },
  "minority": {
    displayName: "边区",
    supply: 0,
    trade: 1,
    slot: 0,
  },
  "jungle": {
    displayName: "热带",
    supply: 3,
    trade: 0,
    slot: 0,
  },
  "desert_city": {
    displayName: "沙城",
    supply: 1,
    trade: 2,
    slot: 0,
  },
}
