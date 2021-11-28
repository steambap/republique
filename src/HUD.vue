<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from './store';
const sizeX = ref(10);
const sizeY = ref(10);

const store = useStore();
const onSetMapSize = () => {
  store.commit('setMapSize', {
    x: sizeX.value,
    y: sizeY.value
  });
};
let exportTxt = ref("");
const onExport = () => {
  exportTxt.value = store.getters.terrainDataAsStr;
};
const editMode = computed(() => store.state.editMode);
const onSetEditMode = (newMode: string) => {
  store.commit('setEditMode', newMode);
};
const terrainSelect = computed(() => store.state.terrainSelect);
const onSetTerrain = (e: MouseEvent) => {
  if (e.target instanceof HTMLInputElement) {
    store.commit('setTerrain', parseInt(e.target.value));
  }
};
</script>
<template>
  <div id="HUD">
    <div class="right-panel">
      <div>Map Editor</div>
      <div class="size-setter">
        <input type="number" v-model.number="sizeX" min="7" max="21" />
        x
        <input type="number" v-model.number="sizeY" min="7" max="21" />
        <button type="button" @click="onSetMapSize">set</button>
      </div>
      <div>tools</div>
      <div>
        <button @click="() => onSetEditMode('select')" :disabled="editMode === 'select'">select</button>
        <button @click="() => onSetEditMode('terrain')" :disabled="editMode === 'terrain'">terrain</button>
        <button
          @click="() => onSetEditMode('elavation')"
          :disabled="editMode === 'elavation'"
        >elavation</button>
      </div>
      <div v-if="editMode === 'terrain'">Please select a terrain</div>
      <div v-if="editMode === 'terrain'">
        <label>
          <input
            @click="onSetTerrain"
            type="radio"
            name="terrainSelect"
            :checked="terrainSelect === 0"
            value="0"
          />
          Wood
        </label>
        <label>
          <input
            @click="onSetTerrain"
            type="radio"
            name="terrainSelect"
            :checked="terrainSelect === 1"
            value="1"
          />
          Plain
        </label>
        <label>
          <input
            @click="onSetTerrain"
            type="radio"
            name="terrainSelect"
            :checked="terrainSelect === 2"
            value="2"
          />
          Water
        </label>
        <label>
          <input
            @click="onSetTerrain"
            type="radio"
            name="terrainSelect"
            :checked="terrainSelect === 3"
            value="3"
          />
          Mountain
        </label>
      </div>
      <div>options</div>
      <div>
        <button @click="onExport">export</button>
        <br />
        <textarea v-model="exportTxt" rows="10"></textarea>
      </div>
    </div>
  </div>
</template>
<style>
#HUD .right-panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background-color: #d3dcde;
}
</style>