import { atom, useRecoilState } from "recoil";
import { produce } from "immer";
import { FactionTable } from "../engine/faction";
import core from "../maps/core.json";

export interface ITBS {
  factionTable: FactionTable;
  turn: number;
  playerQueue: string[];
  currentPlayer: number;
  baseInflation: number;
}

export const tbsStore = atom<ITBS>({
  key: "turn_based",
  default: {
    turn: 0,
    factionTable: core.factionTable as FactionTable,
    playerQueue: [],
    currentPlayer: -1,
    baseInflation: 1,
  },
});

export const useInitGame = () => {
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const { factionTable } = gameState;

  const init = () => {
    const nextTurn = 1;
    const queue: string[] = [];
    const factionIds = Object.keys(factionTable);
    factionIds.forEach((id) => {
      if (factionTable[id].countryStatus === "active") {
        queue.push(id);
      }
    });
    const nextPlayer = 0;

    setGameState(
      produce((draft) => {
        draft.turn = nextTurn;
        draft.playerQueue = queue;
        draft.currentPlayer = nextPlayer;
      })
    );
  };

  return init;
};

export const useEndTurn = () => {
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const { factionTable, playerQueue, currentPlayer, turn } = gameState;

  const endTurn = () => {
    let queue = playerQueue;
    let nextTurn = turn;
    let nextPlayer = currentPlayer + 1;
    if (playerQueue[nextPlayer] == null) {
      nextTurn += 1;
      queue = [];
      const factionIds = Object.keys(factionTable);
      factionIds.forEach((id) => {
        if (factionTable[id].countryStatus === "active") {
          queue.push(id);
        }
      });
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
