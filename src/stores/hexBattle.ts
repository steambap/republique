import { defineStore } from 'pinia';
import konva from 'konva';
import { newUnit, TerrainTable, UnitTable, Unit, getCostTable, findReachableCells } from '../map-definition';
import map from '../maps/jiangxi.json';

export const useHexBattleStore = defineStore('hexBattle', {
  state: () => {
    const terrainData: TerrainTable = map.data;
    const unitData: UnitTable = {};
    const unit = newUnit({ x: 6, y: 6 }, "0");
    const unit2 = newUnit({ x: 3, y: 8 }, "0");
    unitData[unit.id] = unit;
    unitData[unit2.id] = unit2;
    const moveRange: Array<konva.Vector2d> = [];

    return {
      width: map.width,
      height: map.height,
      terrainData,
      unitData,
      unitSelected: "-1",
      moveRange
    };
  },
  actions: {
    selectUnit(payload: string) {
      this.unitSelected = payload;
      if (!this.currentUnit) {
        this.moveRange = [];
        return;
      }

      const unitLoc = new Map<string, Unit>();
      for (const uid in this.unitData) {
        const unit = this.unitData[uid];
        const { x, y } = unit.pos;
        const locID = (y * this.width + x).toString();
        unitLoc.set(locID, unit);
      }

      const paths = findReachableCells(
        getCostTable(this.terrainData, this.width),
        this.currentUnit,
        unitLoc,
        this.width
      );

      const moveRange: Array<konva.Vector2d> = [];
      for (const id of paths.keys()) {
        const tile = this.terrainData[id];
        moveRange.push({
          x: tile.x,
          y: tile.y
        });
      }
      this.moveRange = moveRange;
    },
    selectHex(payload: konva.Vector2d) {
      if (!this.currentUnit) {
        return;
      }

      const nodeID = this.moveRange.findIndex(({ x, y }) => {
        return payload.x === x && payload.y === y;
      });
      // out of move range, do nothing for now
      if (nodeID === -1) {
        return;
      }
      const unit = this.currentUnit;
      this.unitSelected = "-1";
      this.moveRange = [];
      unit.pos = payload;
    }
  },
  getters: {
    currentUnit(state): Unit | null {
      return state.unitData[state.unitSelected];
    }
  }
});
