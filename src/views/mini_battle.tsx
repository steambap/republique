import { useCallback } from "react";
import { produce } from "immer";
import { useRecoilState } from "recoil";
import { miniBattleState } from "../stores/mini_battle";
import MiniUnitInfo from "./components/mini_unit_info";
import { battle } from "../engine/combat";

const MiniBattle = () => {
  const [battleState, setBattleState] = useRecoilState(miniBattleState);
  const doBattle = useCallback(() => {
    const combatResult = battle(
      [battleState.unit1],
      [battleState.unit2],
      battleState.unit1Terrain,
      battleState.unit2Terrain
    );
    const { attackerTable, defenderTable } = combatResult;
    setBattleState(
      produce((draft) => {
        draft.log.push(`--->Battle start at ${Date.now()}<---`);
        draft.log.push(...combatResult.log);
        Object.keys(attackerTable).forEach((unitID) => {
          if (unitID === battleState.unit1.id) {
            draft.unit1 = attackerTable[unitID];
          }
        });
        Object.keys(defenderTable).forEach((unitID) => {
          if (unitID === battleState.unit2.id) {
            draft.unit2 = defenderTable[unitID];
          }
        });
      })
    );
  }, [battleState]);
  return (
    <div className="flex justify-center h-screen overflow-hidden">
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
            <button className="button" onClick={() => doBattle()}>Battle!</button>
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
      <div className="w-96 bg-slate-200 overflow-auto">
        {battleState.log.map((text, idx) => <div key={idx}>{text}</div>)}
      </div>
    </div>
  );
};

export default MiniBattle;
