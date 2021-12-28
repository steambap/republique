<script setup lang="ts">
import { computed, watch } from 'vue';
import konva from 'konva';
import { Point } from './hex';
import { useHexBattleStore } from './stores/hexBattle';
import useImage from './use-image';
import unitIconPaths from './assets/soldier.webp';

const origin = new Point(120, 80);
const size = 48;
const store = useHexBattleStore();
const terrainColor = [150, 60, 200, 25];
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
    store.selectHex(originalPos);
  }
};

const overlayList = computed(() => store.moveRange.map(path => {
  const pos = path[0];
  const pixel = new Point(pos.x, pos.y).toPixel(size).add(origin);

  return {
    x: pixel.x,
    y: pixel.y,
    sides: 6,
    radius: size - 12,
    stroke: 'red',
    id: `${pos.x},${pos.y}`,
  };
}));

const [unitIcon] = useImage(unitIconPaths);
const unitList = computed(() => Object.values(store.unitData).map(d => {
  const pixel = new Point(d.pos.x, d.pos.y).toPixel(size).add(origin);

  return {
    x: pixel.x,
    y: pixel.y,
    id: d.id
  };
}));

const onUnitClick = (e: any) => {
  if (e.target instanceof konva.Shape) {
    const { unitId } = e.target.attrs;
    store.selectUnit(unitId);
  }
};
const unitRefs: { [key: string]: konva.Group; } = {};
const setItemRef = (el: any) => {
  if (!el) return;
  const group = el.getNode() as konva.Group;
  const id = group.attrs.id as string;
  unitRefs[id] = group;
};
watch(() => store.animPath, (animPath) => {
  if (animPath.length === 0) {
    return;
  }
  const fnList = animPath.slice(0).map(({ x, y }) => {
    const pixel = new Point(x, y).toPixel(size).add(origin);
    const group = unitRefs[store.unitSelected];

    return function (cb: Function) {
      group.to({
        x: pixel.x,
        y: pixel.y,
        duration: 0.1,
        onFinish: cb,
      });
    };
  });

  const waterfall = function (fn: Function[], done: Function) {
    fn.length ? fn.pop()!(
      function () { waterfall(fn, done); }
    ) : done();
  };
  waterfall(fnList, function () {
    store.endMoveAnim(animPath[0]);
  });
});
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
  <v-group name="overlay" :config="{ listening: false }">
    <v-group
      v-for="oData in overlayList"
      :key="oData.id"
      :config="{
        x: oData.x,
        y: oData.y
      }"
    >
      <v-circle
        :config="{
          radius: oData.radius - 12,
          stroke: oData.stroke,
          strokeWidth: 2
        }"
      ></v-circle>
    </v-group>
  </v-group>
  <v-group name="units" @click="onUnitClick">
    <v-group
      v-for="unitData in unitList"
      :key="unitData.id"
      :config="{
        x: unitData.x,
        y: unitData.y,
        id: unitData.id
      }"
      :ref="setItemRef"
    >
      <v-rect
        :config="{
          x: -24,
          y: -24,
          width: 48,
          height: 48,
          cornerRadius: 4,
          fill: 'black',
          stroke: 'white',
          strokeWidth: 1,
          shadowBlur: 2,
          unitId: unitData.id
        }"
      ></v-rect>
      <v-image
        :config="{
          x: -24,
          y: -24,
          image: unitIcon,
          listening: false
        }"
      ></v-image>
    </v-group>
  </v-group>
</template>
