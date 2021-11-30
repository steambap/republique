<script setup lang="ts">
import { computed } from 'vue';
import konva from 'konva';
import { Point } from './hex';
import { useHexBattleStore } from './stores/hexBattle';

const origin = new Point(120, 80);
const size = 48;
const store = useHexBattleStore();
const terrainColor = [150, 50, 200, 25];
const cellList = computed(() => Object.values(store.terrainData).map(d => {
  const pixel = new Point(d.x, d.y).toPixel(size).add(origin);
  const fillH = terrainColor[d.terrain] ? terrainColor[d.terrain] : 300;

  return {
    x: pixel.x,
    y: pixel.y,
    sides: 6,
    radius: size,
    fill: `hsl(${fillH}, 60%, 60%)`,
    fill1: `hsl(${fillH}, 65%, 65%)`,
    elavation: d.elavation,
    renderH1: d.elavation >= 1 || d.terrain === 3,
    renderH2: d.elavation >= 2 || d.terrain === 3,
    stroke1: `hsl(${fillH}, 50%, 50%)`,
    strokeWidth: 2,
    id: `${d.x},${d.y}`,
    originalPos: { x: d.x, y: d.y }
  };
}));

const onTileClick = (e: any) => {
  if (e.target instanceof konva.RegularPolygon) {
    const { originalPos } = e.target.attrs;
    console.log(originalPos);
  }
};

const unitList = computed(() => Object.values(store.unitData).map(d => {
  const pixel = new Point(d.pos.x, d.pos.y).toPixel(size).add(origin);

  return {
    x: pixel.x,
    y: pixel.y,
    id: d.id
  };
}));

const onUnitClick = (e: any) => {
  if (e.target instanceof konva.Circle) {
    const { unitId } = e.target.attrs;
    store.selectUnit(unitId);
  }
};
</script>

<template>
  <v-group name="tiles" @click="onTileClick">
    <v-group
      v-for="cellData in cellList"
      :key="cellData.id"
      :config="{
        x: cellData.x,
        y: cellData.y
      }"
    >
      <v-regular-polygon
        :config="{
          sides: cellData.sides,
          radius: cellData.radius,
          fill: cellData.fill,
          originalPos: cellData.originalPos
        }"
      ></v-regular-polygon>
      <v-regular-polygon
        v-if="cellData.renderH2"
        :config="{
          sides: cellData.sides,
          radius: cellData.radius - 4,
          fill: cellData.fill1,
          stroke: cellData.stroke1,
          strokeWidth: cellData.strokeWidth + 2,
          listening: false
        }"
      ></v-regular-polygon>
      <v-regular-polygon
        v-if="cellData.renderH1"
        :config="{
          sides: cellData.sides,
          radius: cellData.radius - 8,
          fill: cellData.fill1,
          stroke: cellData.stroke1,
          strokeWidth: cellData.strokeWidth,
          listening: false
        }"
      ></v-regular-polygon>
      <v-text :config="{ text: cellData.id, listening: false }"></v-text>
    </v-group>
  </v-group>
  <v-group name="units" @click="onUnitClick">
    <v-group
      v-for="unitData in unitList"
      :key="unitData.id"
      :config="{
        x: unitData.x,
        y: unitData.y
      }"
    >
      <v-circle
        :config="{
          radius: 32,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 2,
          unitId: unitData.id
        }"
      ></v-circle>
      <v-path
        :config="{
          x: -22,
          y: -22,
          data: 'M255.875 19.47c-33.142 0-59.844 26.822-59.844 60.186 0 33.364 26.703 60.156 59.845 60.156 33.142 0 59.875-26.792 59.875-60.156S289.017 19.47 255.875 19.47zm-50.688 120.343c-2.908 1.23-5.658 2.53-8.187 3.937-14.467 8.046-21.47 17.86-21.47 27.094 0 9.234 7.003 19.08 21.47 27.125 14.467 8.044 35.51 13.436 58.875 13.436 23.365 0 44.408-5.392 58.875-13.437 14.467-8.047 21.47-17.892 21.47-27.126 0-9.234-7.003-19.048-21.47-27.094-2.53-1.406-5.28-2.708-8.188-3.938-13.696 11.647-31.392 18.688-50.687 18.688-19.3 0-36.996-7.034-50.688-18.688zm78.875 87.906c-8.948 1.54-18.394 2.374-28.187 2.374-9.315 0-18.316-.758-26.875-2.156 2.69 6.923 4.36 14.186 4.906 21.656 2.456 33.554-17.04 69.573-58.47 93.594l-.155.093-.155.095c-20.062 10.653-30.28 24.056-30.28 36.97 0 12.9 10.28 26.46 30.343 37.217 20.062 10.76 48.86 17.844 80.75 17.844s60.687-7.085 80.75-17.844c20.062-10.758 30.343-24.318 30.343-37.218 0-13.127-10.773-26.656-31.655-37.406l-.22-.125-.186-.094c-40.344-23.394-58.705-59.676-55.908-93.22.626-7.497 2.31-14.813 5-21.78zM128.845 395.655c-5.592 3.72-10.256 7.61-13.875 11.53-6.9 7.48-9.94 14.64-9.94 21.845 0 7.206 3.04 14.397 9.94 21.876 6.898 7.48 17.6 14.852 31.28 21.125 27.36 12.547 66.42 20.69 109.625 20.69 43.206 0 82.295-8.143 109.656-20.69 13.682-6.27 24.352-13.644 31.25-21.124 6.9-7.48 9.97-14.67 9.97-21.875 0-7.204-3.07-14.363-9.97-21.842-3.597-3.902-8.238-7.767-13.78-11.47-5.638 15.6-19.584 28.706-37.5 38.313-23.533 12.62-54.947 20.095-89.563 20.095-34.615 0-66.06-7.474-89.593-20.094-17.94-9.62-31.887-22.747-37.5-38.374z',
          fill: 'black',
          listening: false,
          scale: {
            x: 0.09375,
            y: 0.09375
          }
        }"
      ></v-path>
    </v-group>
  </v-group>
</template>
