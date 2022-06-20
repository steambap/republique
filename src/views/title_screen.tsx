import { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { gameStore } from "../stores/game";
import License from "./license";

const TitleScreen = () => {
  const [gameState, setGameState] = useRecoilState(gameStore);
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
  const setVolumn = useCallback((val) => {
    setGameState(produce(draft => {
      const newVolumn = parseInt(val, 10) || 0;
      draft.volumn = newVolumn;
    }))
  }, []);
  const configModal = useRef<HTMLDialogElement>(null);
  const licenseModal = useRef<HTMLDialogElement>(null);

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
        <button className="button text-xl mb-10" disabled>
          读取进度
        </button>
        <button
          className="button text-xl mb-10"
          onClick={() => configModal.current?.showModal()}
        >
          设置
        </button>
        <button
          className="button text-xl"
          onClick={() => licenseModal.current?.showModal()}
        >
          许可
        </button>
      </div>
      <dialog ref={configModal}>
        <div className="flex">
          <div className="mr-4">音量</div>
          <input type="range" min="0" max="100" value={gameState.volumn} onChange={e => setVolumn(e.target.value)} />
        </div>
        <div>
          <button
            className="button mt-10"
            onClick={() => configModal.current?.close()}
          >
            关闭
          </button>
        </div>
      </dialog>
      <dialog ref={licenseModal}>
        <License />
        <div>
          <button
            className="button mt-10"
            onClick={() => licenseModal.current?.close()}
          >
            好的
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default TitleScreen;
