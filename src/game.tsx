import { useRecoilValue } from "recoil";
import { gameState } from "./stores/game";
import TitleScreen from "./views/title_screen";
import MiniBattle from "./views/mini_battle";
import MainMap from "./views/main_map";

const Game = () => {
  const { currentScene } = useRecoilValue(gameState);

  return (
    <>
      {currentScene === "main_map" && <MainMap />}
      {currentScene === "title_screen" && <TitleScreen />}
      {currentScene === "mini_battle" && <MiniBattle />}
    </>
  );
};

export default Game;
