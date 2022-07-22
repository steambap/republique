import { useEffect, useCallback, useState } from "react";
import Konva from "konva";
import { useRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import { Group, RegularPolygon, Circle, Text } from "react-konva";
import { produce } from "immer";
import { mainMapStore, getCityList, getCurrentCity } from "../stores/main_map";
import { tbsStore } from "../stores/turn_based";
import { cpuStore } from "../stores/ai";
import { Pos } from "../engine/hex";
import { IRect, Rect } from "../engine/rectangle";
import { ITileData, getTileId } from "../engine/map_definition";
import AIView from "./ai_view";
import { useInitGame } from "../stores/turn_based";
import EndTurn from "./components/end_turn";
import FactionInfo from "./components/faction_info";
import CurrentCity from "./current_city";
import TerrainMap from "./terrain_map";
import Stage from "./stage";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const size = 24;
const cellList: ITileData[] = [];
for (let i = 0; i < 115; i++) {
  for (let j = 0; j < 99; j++) {
    cellList.push({
      id: getTileId(i, j),
      x: i,
      y: j,
      terrain: 1,
      elavation: 0,
    });
  }
}
const MainMap = () => {
  const [x, setX] = useState(2048);
  const [y, setY] = useState(2048);
  const [mapState, setMapState] = useRecoilState(mainMapStore);
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const cityList = useRecoilValue(getCityList);
  const onCitySelect = useRecoilCallback(
    () => (id: string) => {
      setMapState(
        produce((draft) => {
          draft.citySelected = id;
          draft.bSlotSelected = null;
        })
      );
    },
    []
  );
  const [cpuState] = useRecoilState(cpuStore);
  const initGame = useInitGame();
  useEffect(() => {
    initGame();
  }, []);
  const onDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    setX(2048 - e.target.x());
    setY(2048 - e.target.y());
  }, []);
  const rect: IRect = {
    x: x - size,
    y: y - size,
    width: innerWidth + size * 2,
    height: innerHeight + size * 2,
  };

  return (
    <div id="main-map">
      <Stage onDragEnd={onDragEnd}>
        <Group x={-2048} y={-2048}>
          <TerrainMap />
          <Group name="tiles">
            {cellList.map((d) => {
              const pixel = Pos.toPixel(d, size);
              if (!Rect.contains(rect, pixel)) {
                return null;
              }

              return (
                <Group key={d.id} x={pixel.x} y={pixel.y}>
                  <RegularPolygon
                    sides={6}
                    radius={size}
                    stroke="grey"
                    strokeWidth={1}
                  />
                </Group>
              );
            })}
          </Group>
          <Group name="city">
            {cityList.map((city) => {
              const pixel = Pos.toPixel(city, size);
              if (!Rect.contains(rect, pixel)) {
                return null;
              }

              return (
                <Group
                  x={pixel.x}
                  y={pixel.y}
                  key={city.id}
                  onClick={() => onCitySelect(city.id)}
                >
                  <Text
                    text={city.name + city.id}
                    x={-7 * city.name.length}
                    y={-30}
                    fontSize={14}
                  />
                  <Circle
                    fill={gameState.factionTable[city.owner].backgroundColor}
                    stroke="black"
                    radius={12}
                    strokeWidth={1}
                  />
                </Group>
              );
            })}
          </Group>
        </Group>
      </Stage>
      <FactionInfo />
      <CurrentCity />
      <EndTurn />
      {Object.entries(cpuState.aiStateTable).map(([id, cpuData]) => (
        <AIView key={id} cpuState={cpuData} />
      ))}
    </div>
  );
};

export default MainMap;
