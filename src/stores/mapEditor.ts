import { defineStore } from 'pinia';
import map from '../maps/hunan.json';
import konva from 'konva';

// terrain -1/impossible 0/wood 1/plain 2/water 3/mountain
export interface TerrainTile {
  x: number;
  y: number;
  terrain: number;
  elavation: number;
}

export interface TerrainTable {
  [id: string]: TerrainTile;
}

export interface IMapEditor {
  width: number;
  height: number;
  terrainData: TerrainTable;
  editMode: 'select' | 'terrain' | 'elavation';
  terrainSelect: number;
}

export const useMapEditorStore = defineStore('mapEditor', {
  state: () => {
    const ret: IMapEditor = {
      width: map.width,
      height: map.height,
      terrainData: map.data,
      editMode: 'select',
      terrainSelect: 0,
    };

    return ret;
  },
  actions: {
    setMapSize(payload: konva.Vector2d) {
      const { x, y } = payload;
      const newTiles: TerrainTable = {};
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          const id = j * x + i;
          newTiles[id.toString()] = {
            x: i,
            y: j,
            terrain: 1,
            elavation: 0,
          };
        }
      }

      this.terrainData = newTiles;
      this.width = x;
      this.height = y;
    },
    setEditMode(payload: string) {
      if (payload === 'terrain') {
        this.editMode = payload;
      } else if (payload === 'elavation') {
        this.editMode = payload;
      } else {
        this.editMode = 'select';
      }
    },
    setTile(payload: konva.Vector2d) {
      const idx = payload.y * this.width + payload.x;
      if (!this.terrainData[idx]) {
        console.log('Nonsense location', payload);
      }
      if (this.editMode === 'select') {
        // Do nothing for now
        console.log('You clicked on:', payload);
      } else if (this.editMode === 'elavation') {
        const tile = this.terrainData[idx];
        if (tile.terrain >= 2) {
          console.log('You try to raise a water or mountain tile');
          return;
        }
        tile.elavation = (tile.elavation + 1) % 3;
      } else {
        const tile = this.terrainData[idx];
        tile.terrain = this.terrainSelect;
      }
    }
  },
  getters: {
    terrainDataAsStr(state): string {
      const exportData: { width: number, height: number, data: TerrainTable; } = {
        width: state.width,
        height: state.height,
        data: state.terrainData,
      };

      return JSON.stringify(exportData, null, 2);
    }
  }
});
