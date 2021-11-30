import { defineStore } from 'pinia';

export interface ILayer {
  currentScene: 'map-editor' | 'hex-battle';
}

export const useLayerStore = defineStore<string, ILayer>('layer', {
  state: () => ({
    currentScene: 'hex-battle'
  })
});
