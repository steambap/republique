<script setup lang="ts">
import { computed } from 'vue';
import konva from 'konva';
import { Point } from './hex';
import { useMapEditorStore } from './stores/map_editor';
import { size, origin, terrainHue } from './constants';

const store = useMapEditorStore();
const cellList = computed(() => Object.values(store.terrainData).map(d => {
  const pixel = new Point(d.x, d.y).toPixel(size).add(origin);
  const fillH = terrainHue[d.terrain] ? terrainHue[d.terrain] : 300;

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
    store.setTile(originalPos);
  }
};
</script>

<template>
  <v-group name="tiles" @click="onTileClick">
    <v-group v-for="cellData in cellList" :key="cellData.id">
      <v-regular-polygon :config="cellData"></v-regular-polygon>
      <v-regular-polygon
        v-if="cellData.renderH2"
        :config="{
          x: cellData.x,
          y: cellData.y,
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
          x: cellData.x,
          y: cellData.y,
          sides: cellData.sides,
          radius: cellData.radius - 8,
          fill: cellData.fill1,
          stroke: cellData.stroke1,
          strokeWidth: cellData.strokeWidth,
          listening: false
        }"
      ></v-regular-polygon>
      <v-text :config="{ x: cellData.x, y: cellData.y, text: cellData.id, listening: false }"></v-text>
    </v-group>
  </v-group>
</template>
