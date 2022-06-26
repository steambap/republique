import { useRecoilState } from "recoil";
import Icon from "@mdi/react";
import { mdiBarley, mdiStopCircle, mdiStar, mdiFlask } from "@mdi/js";
import { tbsStore } from "../../stores/turn_based";
import { mainMapStore } from "../../stores/main_map";
import {
  formatIncome,
  formatNumber,
  getGoldIncome,
  getSupplyIncome,
  getInfluenceIncome,
  getActionPoint,
} from "../../engine/faction_ext";

const FactionInfo = () => {
  const [gameState] = useRecoilState(tbsStore);
  const [mapState] = useRecoilState(mainMapStore);
  const { factionTable, playerQueue, currentPlayer } = gameState;

  const factionID = playerQueue[currentPlayer];
  if (factionID == null) {
    return null;
  }
  const faction = factionTable[factionID];

  return (
    <div className="fixed bottom-10 right-32">
      <div className="text-white text-left bg-gray-700 p-2 rounded-lg">
        <div className="pb-2">{`${faction.name} (#${factionID})`}</div>
        <div className="pb-2">{`${faction.action} / ${getActionPoint(faction, mapState.cityTable)}`}</div>
        <div className="pb-2">
          <div className="flex">
            <Icon
              path={mdiBarley}
              size="1.25em"
              className="text-lime-600 inline-block"
            />
            <span>
              {`${formatNumber(faction.supply)}(${formatIncome(
                getSupplyIncome(faction, mapState.cityTable)
              )})`}
            </span>
          </div>
          <div className="flex">
            <Icon
              path={mdiStopCircle}
              size="1.25em"
              className="text-yellow-600 inline-block"
            />
            <span>
              {`${formatNumber(faction.gold)}(${formatIncome(
                getGoldIncome(faction, mapState.cityTable)
              )})`}
            </span>
          </div>
          <div className="flex">
            <Icon
              path={mdiStar}
              size="1.25em"
              className="text-violet-500 inline-block"
            />
            <span>{`${formatNumber(faction.influence)}(${formatIncome(
                getInfluenceIncome(faction, mapState.cityTable)
              )})`}</span>
          </div>
          <div className="flex items-center">
            <Icon
              path={mdiFlask}
              size="1.25em"
              className="text-blue-500 inline-block"
            />
            <span>{`${formatNumber(faction.reformPt)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactionInfo;
