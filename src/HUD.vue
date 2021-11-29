<script setup lang="ts">
import { computed } from 'vue';
import { useLayerStore } from './stores/layer';

const store = useLayerStore();
const scene = computed(() => store.currentScene);
</script>
<template>
  <div id="HUD">
    <MapEditorTools v-if="scene === 'map-editor'"></MapEditorTools>
  </div>
</template>
<script lang="ts">
import MapEditorTools from './views/MapEditorTools.vue';

export default {
  components: { MapEditorTools }
};
</script>
