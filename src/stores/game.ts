import { atom } from 'recoil';

export type TScene = 'map-editor' | 'hex-battle' | 'city-battle';
export interface IGame {
  currentScene: TScene;
}

export const gameState = atom<IGame>({
  key: 'game',
  default: {
    currentScene: 'map-editor',
  },
});
