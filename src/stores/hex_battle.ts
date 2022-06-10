import { atom } from "recoil";
import { newTile, TerrainTable, getTileId } from "../engine/map_definition";
import { TWeather } from "../engine/weather";
import jsonData from "../maps/battle_3.json";

export interface IHexBattle {
  turn: number;
}

export const hexBattleState = atom<IHexBattle>({
  key: "hex_battle",
  default: {
    turn: 0,
  },
});

export interface IHexBattleMap {
  width: number;
  height: number;
  terrainData: TerrainTable;
  weather: TWeather;
}

export const hexBattleMapState = atom<IHexBattleMap>({
  key: "hex_battle_map",
  default: {
    width: jsonData.width,
    height: jsonData.height,
    terrainData: jsonData.data,
    weather: "dry",
  },
});
