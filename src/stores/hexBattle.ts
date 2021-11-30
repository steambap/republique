import { defineStore } from 'pinia';
import konva from 'konva';
import { newUnit, TerrainTable, UnitTable, Unit } from '../map-definition';
import map from '../maps/jiangxi.json';

export const useHexBattleStore = defineStore('hexBattle', {
  state: () => {
    const terrainData: TerrainTable = map.data;
    const unitData: UnitTable = {};
    const unit = newUnit({ x: 6, y: 6 }, "0");
    unitData[unit.id] = unit;
    const moveRange: Array<konva.Vector2d> = [];

    return {
      width: map.width,
      height: map.height,
      terrainData,
      unitData,
      unitSelected: "-1"
    };
  },
  actions: {
    selectUnit(payload: string) {
      this.unitSelected = payload;
    }
  },
  getters: {
    currentUnit(state): Unit | null {
      return state.unitData[state.unitSelected];
    }
  }
});
