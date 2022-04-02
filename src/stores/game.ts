import { atom } from 'recoil';

export type TScene = 'title_screen' | 'map_editor' | 'hex_battle' | 'city_battle';
export interface IGame {
  currentScene: TScene;
}

export const gameState = atom<IGame>({
  key: 'game',
  default: {
    currentScene: 'map_editor',
  },
});
