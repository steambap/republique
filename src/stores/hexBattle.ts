import { defineStore } from 'pinia';
import konva from 'konva';
import { newUnit, TerrainTable, UnitTable, Unit, getCostTable, findReachableCells } from '../map-definition';
import map from '../maps/jiangxi.json';

export const useHexBattleStore = defineStore('hexBattle', {
  state: () => {
    const terrainData: TerrainTable = map.data;
    const unitData: UnitTable = {};
    const unit = newUnit({ x: 6, y: 6 }, "0", { combatValue: 65 });
    const unit2 = newUnit({ x: 3, y: 8 }, "0", { combatValue: 68 });
    unitData[unit.id] = unit;
    unitData[unit2.id] = unit2;
    const moveRange: konva.Vector2d[][] = [];
    const animPath: konva.Vector2d[] = [];

    return {
      headless: false,
      width: map.width,
      height: map.height,
      terrainData,
      unitData,
      unitSelected: "-1",
      moveRange,
      animPath
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

      const moveRange: konva.Vector2d[][] = [];
      for (const [des, path] of paths.entries()) {
        const tile = this.terrainData[des];
        const singlePath: konva.Vector2d[] = [];
        singlePath.push({
          x: tile.x,
          y: tile.y
        });
        path.forEach(node => {
          const n = this.terrainData[node];
          singlePath.push({
            x: n.x,
            y: n.y
          });
        });
        moveRange.push(singlePath);
      }
      this.moveRange = moveRange;
    },
    selectHex(payload: konva.Vector2d) {
      if (!this.currentUnit) {
        return;
      }

      const nodeID = this.moveRange.findIndex((path) => {
        const { x, y } = path[0];
        return payload.x === x && payload.y === y;
      });
      // out of move range, do nothing for now
      if (nodeID === -1) {
        return;
      }
      if (this.headless) {
        this.endMoveAnim(payload);
      } else {
        this.animPath = this.moveRange[nodeID].slice(1);
        this.moveRange = [];
      }
    },
    endMoveAnim(payload: konva.Vector2d) {
      const unit = this.currentUnit!;
      unit.pos = payload;
      this.unitSelected = "-1";
      this.moveRange = [];
      this.animPath = [];
    }
  },
  getters: {
    currentUnit(state): Unit | null {
      return state.unitData[state.unitSelected];
    }
  }
});
