import { useRecoilValue } from "recoil";
import { gameStore } from "./stores/game";
import TitleScreen from "./views/title_screen";
import SceneSelect from "./views/scene_select";
import MiniBattle from "./views/mini_battle";
import MainMap from "./views/main_map";

const Game = () => {
  const { currentScene } = useRecoilValue(gameStore);

  return (
    <>
      {currentScene === "main_map" && <MainMap />}
      {currentScene === "title_screen" && <TitleScreen />}
      {currentScene === "scene_select" && <SceneSelect />}
      {currentScene === "mini_battle" && <MiniBattle />}
    </>
  );
};

export default Game;
