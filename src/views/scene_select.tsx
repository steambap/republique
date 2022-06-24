import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { tbsStore } from "../stores/turn_based";
import { gameStore } from "../stores/game";
import { mainMapStore } from "../stores/main_map";
import { getTotalPop } from "../engine/main_map";
import { getSupplyIncome, getGoldIncome } from "../engine/faction_ext";

const SceneSelect = () => {
  const [id, setID] = useState("0");
  const [tbsState, setTBSState] = useRecoilState(tbsStore);
  const [mapState] = useRecoilState(mainMapStore);
  const [_, setGameState] = useRecoilState(gameStore);
  const setPlayer = useCallback((id: string) => {
    setID(id);
  }, []);
  const startGame = useCallback((id: string) => {
    setTBSState(
      produce((draft) => {
        Object.values(draft.factionTable).forEach((faction) => {
          if (faction.id === id) {
            faction.player = "human";
          } else {
            faction.player = "ai";
          }
        });
      })
    );

    setGameState(
      produce((draft) => {
        draft.currentScene = "main_map";
      })
    );
  }, []);
  const displayFaction = tbsState.factionTable[id];
  const availableFactions = Object.values(tbsState.factionTable).filter(
    (f) => f.countryStatus === "active"
  );

  return (
    <div className="h-screen hex-background flex justify-center">
      <div className="bg-gray-900 my-10 p-10 overflow-auto">
        {availableFactions.map((faction) => (
          <div key={faction.id} className="flex text-left mb-4">
            <div className="text-white w-40">{faction.name}</div>
            <button
              className="button"
              disabled={id === faction.id}
              onClick={() => setPlayer(faction.id)}
            >
              {`${id === faction.id ? "已选" : "选择"}`}
            </button>
          </div>
        ))}
      </div>
      <div className="my-10 ml-10 overflow-hidden flex flex-col">
        <div className="flex-1 bg-gray-900 p-10 text-left text-white">
          <div>
            <span className="text-lg">{displayFaction.name}</span>
            <span className="text-gray-600">{` (#${displayFaction.id})`}</span>
          </div>
          <div>{`总人口：${getTotalPop(displayFaction.id, mapState.cityTable)} 万`}</div>
          <div>{`补给收入：${getSupplyIncome(displayFaction, mapState.cityTable).toFixed(2)}`}</div>
          <div>{`金钱收入：${getGoldIncome(displayFaction, mapState.cityTable).toFixed(2)}`}</div>
        </div>
        <div className="bg-gray-900 p-10 mt-10">
          <button className="button h-10 w-32" onClick={() => startGame(id)}>
            开始游戏
          </button>
        </div>
      </div>
    </div>
  );
};

export default SceneSelect;
