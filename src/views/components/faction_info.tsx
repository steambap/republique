import { useRecoilState } from "recoil";
import { tbsStore } from "../../stores/turn_based";

const FactionInfo = () => {
  const [gameState] = useRecoilState(tbsStore);
  const { factionTable, playerQueue, currentPlayer } = gameState;

  const factionID = playerQueue[currentPlayer];
  if (factionID == null) {
    return null;
  }
  const name = factionTable[factionID].name;

  return (
    <div className="fixed top-10 left-10">
      <div className="text-white bg-zinc-900 rounded-lg">
        {`${name} (#${factionID})`}
      </div>
    </div>
  );
};

export default FactionInfo;
