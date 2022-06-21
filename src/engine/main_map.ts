export interface ICity {
  name: string;
  posX: number;
  posY: number;
  id: string;
  owner: string;
  supplyPt: number;
  tradePt: number;
  police: number;
  population: number;
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
