import { atom, useRecoilState } from "recoil";
import { produce } from "immer";
import { IFaction } from "../engine/faction";
import core from "../maps/core.json";

export interface ITBS {
  factionTable: Record<string, IFaction>;
  turn: number;
  playerQueue: string[];
  currentPlayer: number;
}

export const tbsState = atom<ITBS>({
  key: "turn_based",
  default: {
    turn: 1,
    factionTable: core.factionTable,
    playerQueue: [],
    currentPlayer: -1,
  },
});

export const useEndTurn = () => {
  const [gameState, setGameState] = useRecoilState(tbsState);
  const { factionTable, playerQueue, currentPlayer, turn } = gameState;

  const endTurn = () => {
    let queue = playerQueue;
    let nextTurn = turn;
    let nextPlayer = currentPlayer + 1;
    if (playerQueue[nextPlayer] == null) {
      nextTurn += 1;
      queue = Object.keys(factionTable);
      nextPlayer = 0;
    }

    setGameState(
      produce((draft) => {
        draft.turn = nextTurn;
        draft.playerQueue = queue;
        draft.currentPlayer = nextPlayer;
      })
    );
  };

  return endTurn;
};
