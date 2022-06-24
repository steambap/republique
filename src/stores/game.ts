import { atom } from "recoil";

export type TScene =
  | "title_screen"
  | "main_map"
  | "mini_battle"
  | "scene_select";
export interface IGame {
  currentScene: TScene;
  volumn: number;
}

export const gameStore = atom<IGame>({
  key: "game",
  default: {
    currentScene: "main_map",
    volumn: 100,
  },
});
