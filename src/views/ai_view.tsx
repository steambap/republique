import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tbsState, useEndTurn } from "../stores/turn_based";
import { IAIState } from "../engine/ai";
import { delay } from "../util";

interface IProps {
  computerState: IAIState;
}

const AIView = ({ computerState }: IProps) => {
  const [gameState, setGameState] = useRecoilState(tbsState);
  const endTurn = useEndTurn();
  const { factionTable, playerQueue, currentPlayer } = gameState;
  useEffect(() => {
    const play = async () => {
      const playerID = playerQueue[currentPlayer];
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
