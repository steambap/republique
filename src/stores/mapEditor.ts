import { defineStore } from 'pinia';
import konva from 'konva';
import { newTile, TerrainTable } from '../map-definition';

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
      width: 10,
      height: 10,
      terrainData: {},
      editMode: 'select',
      terrainSelect: 0,
    };
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const id = j * 10 + i;
        ret.terrainData[id.toString()] = newTile(i, j);
      }
    }

    return ret;
  },
  actions: {
    setMapSize(payload: konva.Vector2d) {
      const { x, y } = payload;
      const newTiles: TerrainTable = {};
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          const id = j * x + i;
          newTiles[id.toString()] = newTile(i, j);
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
