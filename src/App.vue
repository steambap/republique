<script setup lang="ts">
import { computed } from 'vue';
import { useLayerStore } from './stores/layer';
const stageConf = {
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true,
};
const store = useLayerStore();
const scene = computed(() => store.currentScene);

</script>

<template>
  <v-stage :config="stageConf">
    <v-layer>
      <MapEditor v-if="scene === 'map-editor'"></MapEditor>
      <HexBattle v-if="scene === 'hex-battle'"></HexBattle>
    </v-layer>
  </v-stage>
  <HUD></HUD>
</template>
<script lang="ts">
import HUD from './HUD.vue';
import MapEditor from './MapEditor.vue';
import HexBattle from './HexBattle.vue';

export default {
  components: { HUD, MapEditor, HexBattle }
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
