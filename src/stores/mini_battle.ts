import { atom } from "recoil";
import { IUnit, newUnit } from "../engine/unit";
import { TypeADiv, TypeBDiv } from "../engine/toe";
import { TerrainTile } from "../engine/map_definition";

export interface IMiniBattle {
  unit1: IUnit;
  unit2: IUnit;
  unit1Terrain: TerrainTile;
  unit2Terrain: TerrainTile;
  log: string[];
}

const unit1Terrain: TerrainTile = {
  x: 0,
  y: 0,
  terrain: 1,
  elavation: 0,
};
const unit2Terrain = {
  x: 1,
  y: 0,
  terrain: 1,
  elavation: 0,
};

export const miniBattleState = atom<IMiniBattle>({
  key: "mini_battle",
  default: {
    unit1: newUnit(unit1Terrain, "Qing", TypeADiv, { name: "unit1", moral: 45 }),
    unit2: newUnit(unit2Terrain, "Fengtian", TypeBDiv, {
      name: "unit2",
      moral: 35,
    }),
    unit1Terrain,
    unit2Terrain,
    log: [],
  },
});
