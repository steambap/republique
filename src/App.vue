<script setup lang="ts">
import { computed } from 'vue';
import konva from 'konva';
import { Point } from './hex';
import { useStore } from './store';

const stageConf = {
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true,
};
const origin = new Point(120, 80);
const size = 48;
const store = useStore();
const terrainColor = [150, 50, 200, 25];
const cellList = computed(() => Object.values(store.state.terrainData).map(d => {
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
    store.commit('setTile', originalPos);
  }
};
</script>

<template>
  <v-stage :config="stageConf">
    <v-layer @click="onTileClick">
      <v-group name="tiles">
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
    </v-layer>
  </v-stage>
  <HUD></HUD>
</template>
<script lang="ts">
import HUD from './HUD.vue';

export default {
  components: { HUD }
};
</script>
<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
