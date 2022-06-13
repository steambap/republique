export interface ICity {
  name: string;
  posX: number;
  posY: number;
  id: string;
  owner: string;
  supplyPt: number;
  tradePt: number;
  police: number;
}

export type CityTable = Record<string, ICity>;

export interface edgeCost {
  cost: number;
}

export type TEdges = Record<string, Record<string, edgeCost>>;
