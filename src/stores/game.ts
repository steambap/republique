import { atom } from 'recoil';

export type TScene = 'title_screen' | 'main_map' | 'mini_battle';
export interface IGame {
  currentScene: TScene;
}

export const gameState = atom<IGame>({
  key: 'game',
  default: {
    currentScene: 'main_map',
  },
});
