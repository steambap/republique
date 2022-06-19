import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { gameStore } from "../stores/game";

const TitleScreen = () => {
  const [_, setGameState] = useRecoilState(gameStore);
  const newGame = useCallback(() => {
    setGameState(
      produce((draft) => {
        draft.currentScene = "scene_select";
      })
    );
  }, []);
  const quickStart = useCallback(() => {
    setGameState(
      produce((draft) => {
        draft.currentScene = "main_map";
      })
    );
  }, []);

  return (
    <div className="h-screen hex-background">
      <div className="pl-28 pt-24 text-left text-white">
        <h1
          className="text-8xl"
          style={{ textShadow: "1px 1px 2px hsl(180,90%,60%)" }}
        >
          民国时代
        </h1>
        <h3 className="text-5xl tracking-tighter">Age of Repulic 1936</h3>
      </div>
      <div className="fixed right-20 bottom-20 flex flex-col">
        <button className="button text-xl mb-10" onClick={newGame}>
          开始新游戏
        </button>
        <button className="button text-xl mb-10" onClick={quickStart}>
          快速开始
        </button>
        <button className="button text-xl mb-10" disabled>读取进度</button>
        <button className="button text-xl mb-10" disabled>设置</button>
        <button className="button text-xl mb-10" disabled>许可</button>
        <button className="button text-xl" disabled>退出游戏</button>
      </div>
    </div>
  );
};

export default TitleScreen;
