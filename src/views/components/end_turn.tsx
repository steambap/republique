import { useRecoilState } from "recoil";
import { tbsStore, useEndTurn } from "../../stores/turn_based";

const EndTurn = () => {
  const [gameState] = useRecoilState(tbsStore);
  const endTurn = useEndTurn();

  return (
    <div className="fixed right-10 bottom-10">
      <button className="button w-20 h-20 rounded-full" onClick={endTurn}>
        结束回合
      </button>
      <div className="text-white bg-gray-700 rounded-lg">
        {`第 ${gameState.turn} 回合`}
      </div>
    </div>
  );
};

export default EndTurn;
