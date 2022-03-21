import {
  useRecoilValue,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
} from "recoil";
import { Stage, Layer } from "react-konva";
import { gameState } from "./stores/game";
import MapEditor from "./views/map_editor";
import MapEditorPanel from "./views/map_editor_panel";

const width = window.innerWidth;
const height = window.innerHeight;

const Game = () => {
  const { currentScene } = useRecoilValue(gameState);
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <>
      <Stage width={width} height={height} draggable>
        <Bridge>
          <Layer>{currentScene === "map-editor" && <MapEditor />}</Layer>
        </Bridge>
      </Stage>
      <div id="HUD">{currentScene === "map-editor" && <MapEditorPanel />}</div>
    </>
  );
};

export default Game;
