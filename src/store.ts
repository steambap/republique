import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import map from './maps/hunan.json';
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

export interface State {
  width: number;
  height: number;
  terrainData: TerrainTable;
  editMode: 'select' | 'terrain' | 'elavation';
  terrainSelect: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    width: map.width,
    height: map.height,
    terrainData: map.data,
    editMode: 'select',
    terrainSelect: 0,
  },
  mutations: {
    setMapSize(state, payload: konva.Vector2d) {
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

      state.terrainData = newTiles;
      state.width = x;
      state.height = y;
    },
    setEditMode(state, payload: string) {
      if (payload === 'terrain') {
        state.editMode = payload;
      } else if (payload === 'elavation') {
        state.editMode = payload;
      } else {
        state.editMode = 'select';
      }
    },
    setTerrain(state, payload: number) {
      state.terrainSelect = payload;
    },
    setTile(state, payload: konva.Vector2d) {
      const idx = payload.y * state.width + payload.x;
      if (!state.terrainData[idx]) {
        console.log('Nonsense location', payload);
      }
      if (state.editMode === 'select') {
        // Do nothing for now
        console.log('You clicked on:', payload);
      } else if (state.editMode === 'elavation') {
        const tile = state.terrainData[idx];
        if (tile.terrain >= 2) {
          console.log('You try to raise a water or mountain tile');
          return;
        }
        tile.elavation = (tile.elavation + 1) % 3;
      } else {
        const tile = state.terrainData[idx];
        tile.terrain = state.terrainSelect;
      }
    }
  },
  getters: {
    terrainDataAsStr(state) {
      const exportData: { width: number, height: number, data: TerrainTable; } = {
        width: state.width,
        height: state.height,
        data: state.terrainData,
      };

      return JSON.stringify(exportData, null, 2);
    }
  }
});

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
