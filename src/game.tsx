import {
  useRecoilValue,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
} from "recoil";
import { Stage, Layer } from "react-konva";
import { gameState } from "./stores/game";
import MapEditor from "./views/map_editor";
import MapEditorPanel from "./views/map_editor_panel";
import TitleScreen from './views/title_screen';
import MiniBattle from "./views/mini_battle";

const width = window.innerWidth;
const height = window.innerHeight;

const Game = () => {
  const { currentScene } = useRecoilValue(gameState);
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <>
      <Stage width={width} height={height} draggable>
        <Bridge>
          <Layer>{currentScene === "map_editor" && <MapEditor />}</Layer>
        </Bridge>
      </Stage>
      <div id="HUD">
        {currentScene === "map_editor" && <MapEditorPanel />}
        {currentScene === "title_screen" && <TitleScreen />}
        {currentScene === "mini_battle" && <MiniBattle />}
      </div>
    </>
  );
};

export default Game;
