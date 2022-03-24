import { atom } from "recoil";
import { newTile, TerrainTable, getTileId } from "../engine/map_definition";
import map from "../maps/hunan.json";

export type TEditMode = "select" | "terrain" | "elavation" | "road";
export type TRoadMode = "add node" | "delete node" | 'delete road';

export interface IMapEditor {
  width: number;
  height: number;
  terrainData: TerrainTable;
  editMode: TEditMode;
  terrainSelect: number;
  roadMode: TRoadMode;
  roadData: string[][];
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
const roadData: string[][] = map.roadData;
roadData.push([]);

export const mapEditorState = atom<IMapEditor>({
  key: "map_editor",
  default: {
    width: 14,
    height: 14,
    terrainData,
    editMode: "select",
    terrainSelect: 0,
    roadMode: "add node",
    roadData,
  },
});
