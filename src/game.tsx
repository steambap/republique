import { useRecoilValue } from "recoil";
import { gameState } from "./stores/game";
import MapEditor from "./views/map_editor";
import TitleScreen from "./views/title_screen";
import MiniBattle from "./views/mini_battle";

const Game = () => {
  const { currentScene } = useRecoilValue(gameState);

  return (
    <>
      {currentScene === "map_editor" && <MapEditor />}
      {currentScene === "title_screen" && <TitleScreen />}
      {currentScene === "mini_battle" && <MiniBattle />}
    </>
  );
};

export default Game;
