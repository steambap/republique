import { useCallback } from "react";
import { produce } from "immer";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainMapStore, getCurrentCity } from "../stores/main_map";
import { City } from "../engine/main_map";
import { bTypeData } from "../engine/building";
import { useAddBuilding } from "../stores/city_building";

const y = [0, 1, 2, 3, 4];

const CurrentCity = () => {
  const [mapState, setMapState] = useRecoilState(mainMapStore);
  const currentCity = useRecoilValue(getCurrentCity);
  const addBuilding = useAddBuilding();
  const selectSlot = useCallback((x: number, y: number) => {
    setMapState(produce(draft => {
      draft.bSlotSelected = {x, y};
    }))
  }, []);

  if (!currentCity) {
    return null;
  }

  return (
    <div className="flex text-white text-left fixed left-10 top-10">
      <div className="bg-gray-700 p-2 rounded-lg">
        <div className="py-2">{`${currentCity.name} #${currentCity.id}`}</div>
        <div>{`贸易：${City.currentTrade(currentCity)} / ${
          currentCity.tradePt
        }`}</div>
        <div>{`人口：${currentCity.population}`}</div>
        <div>{`政治：${currentCity.politicalPt}`}</div>
        <div>{`土改等级：${currentCity.level}`}</div>
      </div>
      <div className="ml-2">
        <div className="bg-gray-700 p-2 rounded-lg">
          <div>
            {y.map((posY) => {
              const found = currentCity.buildings.find((b) => {
                return b.x === 0 && b.y === posY;
              });
              const slotName = found ? bTypeData[found.bType].bName : "空地";
              return (
                <button
                  key={posY.toString()}
                  className="button"
                  onClick={() => selectSlot(0, posY)}
                >{`${slotName}(0,${posY})`}</button>
              );
            })}
          </div>
        </div>
        {mapState.bSlotSelected && (
          <div className="bg-gray-700 mt-2 p-2 rounded-lg">
            {Object.values(bTypeData).map((bData) => {
              return (
                <div key={bData.self}>
                  <span>{bData.bName}</span>
                  <button className="button" onClick={() => addBuilding(currentCity, mapState.bSlotSelected!, bData.self)}>建造</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentCity;
