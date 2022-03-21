import { IPos } from "./hex";

export interface CityTile {
  id: string;
  pos: IPos;
  terrain: number;
  elavation: number;
  neighbors: string[];
}
