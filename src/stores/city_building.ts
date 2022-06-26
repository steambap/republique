import { useRecoilState } from "recoil";
import { produce } from "immer";
import { tbsStore } from "./turn_based";
import { mainMapStore } from "./main_map";
import { TBuilding, bTypeData } from "../engine/building";
import { ICity } from "../engine/main_map";
import { IPos } from "../engine/hex";

export const useAddBuilding = () => {
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const [mapState, setMapState] = useRecoilState(mainMapStore);

  const addBuilding = (city: ICity, pos: IPos, building: TBuilding) => {
    const { factionTable, playerQueue, currentPlayer } = gameState;
    const playerID = playerQueue[currentPlayer];
    if (city.owner !== playerID) {
      return;
    }
    const existing = city.buildings.findIndex((b) => {
      return b.x === pos.x && b.y === pos.y;
    });
    if (existing !== -1) {
      return;
    }
    if (factionTable[playerID].action <= 0) {
      return;
    }
    const cost = bTypeData[building].cost;
    if (factionTable[playerID].gold < cost) {
      return;
    }

    setGameState(
      produce((draft) => {
        const p = draft.factionTable[playerID];
        p.gold -= cost;
        p.action -= 1;
      })
    );
    setMapState(
      produce((draft) => {
        const c = draft.cityTable[city.id];
        c.buildings.push({
          ...pos,
          damaged: 0,
          displayName: "",
          bType: building,
        });
        draft.bSlotSelected = null;
      })
    );
  };

  return addBuilding;
};
