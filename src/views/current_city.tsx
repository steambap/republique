import { useCallback } from "react";
import { Group, RegularPolygon, Line } from "react-konva";
import { produce } from "immer";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainMapStore, getCurrentCity } from "../stores/main_map";
import { City } from "../engine/main_map";
import { bTypeData } from "../engine/building";
import { useAddBuilding } from "../stores/city_building";
import { getPlayerID } from "../stores/turn_based";
import KonvaCanvas from "./konva_canvas";
import { ITileData, getTileId } from "../engine/map_definition";
import { Pos } from "../engine/hex";
import { size, origin, elavationColor } from "../constants";
import { TerrainTile } from "./components/terrain";
import { BuildingTile } from "./components/building";

const y = [0, 1, 2, 3, 4];
const cellList: ITileData[] = [];
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 9; j++) {
    cellList.push({
      id: getTileId(i, j),
      x: i,
      y: j,
      terrain: 1,
      elavation: 0,
    });
  }
}

const CurrentCity = () => {
  const [mapState, setMapState] = useRecoilState(mainMapStore);
  const currentCity = useRecoilValue(getCurrentCity);
  const playerID = useRecoilValue(getPlayerID);
  const addBuilding = useAddBuilding();
  const selectSlot = useCallback((x: number, y: number) => {
    setMapState(
      produce((draft) => {
        draft.bSlotSelected = { x, y };
      })
    );
  }, []);
  const slotSel = mapState.bSlotSelected;
  if (!currentCity) {
    return null;
  }
  const existingBuilding = slotSel && currentCity.buildings.find(b => b.x === slotSel.x && b.y === slotSel.y);

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
          <KonvaCanvas width={800} height={480}>
            <Group name="tiles">
              {cellList.map((d) => {
                const selected = slotSel && Pos.equal(slotSel, d);
                const building = currentCity.buildings.find(b => b.x === d.x && b.y === d.y);
                const pixel = Pos.add(origin, Pos.toPixel(d, size));

                return (
                  <Group
                    key={d.id}
                    x={pixel.x}
                    y={pixel.y}
                    onClick={() => selectSlot(d.x, d.y)}
                  >
                    <RegularPolygon
                      sides={6}
                      radius={size}
                      fill={elavationColor[d.elavation]}
                      stroke={selected ? "green" : undefined}
                      strokeWidth={2}
                      name="elavation"
                    />
                    <TerrainTile tile={d} />
                    {building && <BuildingTile type={building.bType} />}
                  </Group>
                );
              })}
            </Group>
          </KonvaCanvas>
        </div>
        {slotSel && currentCity.owner === playerID && (
          <div className="bg-gray-700 mt-2 p-2 rounded-lg">
            {Object.values(bTypeData).map((bData) => {
              return (
                <div key={bData.self}>
                  <span>{bData.bName}</span>
                  <button
                    className="button"
                    onClick={() =>
                      addBuilding(
                        currentCity,
                        slotSel!,
                        bData.self
                      )
                    }
                  >
                    建造
                  </button>
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
