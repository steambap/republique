import { useRecoilState } from "recoil";
import { miniBattleState } from "../stores/mini_battle";
import MiniUnitInfo from "./components/mini_unit_info";

const MiniBattle = () => {
  const [battleState, setBattleState] = useRecoilState(miniBattleState);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center">
      <div className="w-96 bg-slate-300 mr-2">
        <div className="grid gap-4 grid-cols-2 grid-rows-1">
          <MiniUnitInfo
            unit={battleState.unit1}
            tile={battleState.unit1Terrain}
          />
          <MiniUnitInfo
            unit={battleState.unit2}
            tile={battleState.unit2Terrain}
          />
        </div>
        <div className="">
          <div className="mb-2">
            <button className="button">Battle!</button>
          </div>
          <div className="mb-4">
            <button className="button">Predict</button>
          </div>
          <div className="mb-2">
            <button className="button mr-1">Refit Both</button>
            <button className="button mr-1">Refit A</button>
            <button className="button">Refit B</button>
          </div>
          <div className="mb-2">
            <button className="button">Clear log</button>
          </div>
        </div>
      </div>
      <div className="w-96 bg-slate-200">log</div>
    </div>
  );
};

export default MiniBattle;
