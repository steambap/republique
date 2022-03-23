import { atom } from "recoil";
import { newTile, TerrainTable, getTileId } from "../engine/map_definition";
import map from "../maps/jiangxi.json";

export type TEditMode = "select" | "terrain" | "elavation" | "road";

export interface IMapEditor {
  width: number;
  height: number;
  terrainData: TerrainTable;
  editMode: TEditMode;
  terrainSelect: number;
  addRoad: boolean;
}

export function newTerrainTable(x: number, y: number): TerrainTable {
  const terrainData: TerrainTable = {};

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const id = getTileId(i, j);
      terrainData[id.toString()] = newTile(i, j);
    }
  }

  return terrainData;
}

const terrainData: TerrainTable = map.data;

export const mapEditorState = atom<IMapEditor>({
  key: "map_editor",
  default: {
    width: 14,
    height: 14,
    terrainData,
    editMode: "select",
    terrainSelect: 0,
    addRoad: true,
  },
});
