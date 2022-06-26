import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { tbsStore, useEndTurn } from "../stores/turn_based";
import { mainMapStore } from "../stores/main_map";
import { ICPUState } from "../engine/ai";
import { delay } from "../util";
import { getSupplyIncome, getGoldIncome, getInfluenceIncome, getActionPoint } from "../engine/faction_ext";

interface IProps {
  cpuState: ICPUState;
}

const AIView = ({ cpuState }: IProps) => {
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const [mapState] = useRecoilState(mainMapStore);
  const endTurn = useEndTurn();
  const { factionTable, playerQueue, currentPlayer } = gameState;
  useEffect(() => {
    const play = async () => {
      const playerID = playerQueue[currentPlayer];
      if (playerID !== cpuState.factionID) {
        return;
      }
      const faction = factionTable[playerID];
      setGameState(produce(draft => {
        const f = draft.factionTable[playerID];
        f.action = getActionPoint(faction, mapState.cityTable);
        f.supply += getSupplyIncome(faction, mapState.cityTable);
        f.gold += getGoldIncome(faction, mapState.cityTable);
        f.influence += getInfluenceIncome(faction, mapState.cityTable);
      }));
      if (faction.player === "human") {
        return;
      }

      await delay(100);
      endTurn();
    };
    play();
  }, [currentPlayer]);

  return <div></div>;
};

export default AIView;
