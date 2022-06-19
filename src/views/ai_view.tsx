import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tbsStore, useEndTurn } from "../stores/turn_based";
import { ICPUState } from "../engine/ai";
import { delay } from "../util";

interface IProps {
  cpuState: ICPUState;
}

const AIView = ({ cpuState }: IProps) => {
  const [gameState] = useRecoilState(tbsStore);
  const endTurn = useEndTurn();
  const { factionTable, playerQueue, currentPlayer } = gameState;
  useEffect(() => {
    const play = async () => {
      const playerID = playerQueue[currentPlayer];
      if (playerID !== cpuState.factionID) {
        return;
      }
      if (factionTable[playerID].player === "human") {
        return;
      }

      await delay(500);
      endTurn();
    };
    play();
  }, [currentPlayer]);

  return <div></div>;
};

export default AIView;
