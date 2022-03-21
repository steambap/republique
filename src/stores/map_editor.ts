import { atom } from "recoil";
import { newTile, TerrainTable } from "../engine/map_definition";
import map from '../maps/jiangxi.json';

export type TEditMode = "select" | "terrain" | "elavation";

export interface IMapEditor {
  width: number;
  height: number;
  terrainData: TerrainTable;
  editMode: TEditMode;
  terrainSelect: number;
}

export function newTerrainTable(x: number, y: number): TerrainTable {
  const terrainData: TerrainTable = {};

  for (let j = 0; j < y; j++) {
    for (let i = 0; i < x; i++) {
      const id = j * 10 + i;
      terrainData[id.toString()] = newTile(i, j);
    }
  }

  return terrainData;
}

const terrainData: TerrainTable = map.data;

export const mapEditorState = atom<IMapEditor>({
  key: "map_editor",
  default: {
    width: 10,
    height: 10,
    terrainData,
    editMode: "select",
    terrainSelect: 0,
  },
});
