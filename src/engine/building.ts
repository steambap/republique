export type TBuilding =
"textile_1"
// | "textile_alt"
// | "textile_2"
| "food_1"
// | "mining"
// | "mining_alt"
// | "mining_2"
// | "tobacco"
// | "tobacco_alt"
// | "market"
// | "market_2"
// | "train_station"
// | "bank"
// | "broadcast"
// | "main_plaza"
// | "government"
// | "police_station"
// | "court"
// | "park"
// | "school"
// | "university"
// | "book_store"
// | "arsenal"
// | "arsenal_alt"
// | "arsenal_2"

export interface IBuilding {
  x: number;
  y: number;
  damaged: number;
  displayName: string;
  bType: TBuilding;
}

export interface IBuildingInfo extends IBuilding {
  index: number;
  level: number;
}

function toInfoList(buildings: IBuilding[]): IBuildingInfo[] {
  return buildings.map((b, index) => ({
    ...b,
    index,
    level: 1,
  }));
}

export const Building = {
  toInfoList,
};

export interface IBuildingData {
  self: TBuilding;
  bName: string;
  lv2Name: string;
  cost: number;
  upgradable: boolean;
  supply: number;
  trade: number;
  extraSupply: number;
  extraTrade: number;
  police: number;
  influence: number;
  reform: number;
}

export const bTypeData: Record<TBuilding, IBuildingData> = {
  textile_1: {
    self: "textile_1",
    bName: "织布局",
    lv2Name: "服装厂",
    cost: 100,
    upgradable: true,
    supply: 0,
    trade: 1.2,
    extraSupply: 0,
    extraTrade: 0,
    police: 0,
    influence: 0,
    reform: 0,
  },
  food_1: {
    self: "food_1",
    bName: "饼干厂",
    lv2Name: "食品厂",
    cost: 100,
    upgradable: true,
    supply: 0.6,
    trade: 0,
    extraSupply: 0,
    extraTrade: 0,
    police: 0,
    influence: 0,
    reform: 0,
  },
}
