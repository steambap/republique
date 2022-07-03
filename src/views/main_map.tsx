import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import { Group, Image, Circle, Text, Line } from "react-konva";
import { produce } from "immer";
import useImage from "use-image";
import KonvaCanvas from "./konva_canvas";
import {
  mainMapStore,
  getCityList,
  getCurrentCity,
  getRoadList,
} from "../stores/main_map";
import { tbsStore } from "../stores/turn_based";
import { cpuStore } from "../stores/ai";
import { City } from "../engine/main_map";
import AIView from "./ai_view";
import { useInitGame } from "../stores/turn_based";
import EndTurn from "./components/end_turn";
import FactionInfo from "./components/faction_info";
import CurrentCity from "./current_city";

const MainMap = () => {
  const [map_0_0] = useImage("/map/map-0-0.webp");
  const [map_1_0] = useImage("/map/map-1-0.webp");
  const [map_2_0] = useImage("/map/map-2-0.webp");
  const [map_3_0] = useImage("/map/map-3-0.webp");
  const [map_0_1] = useImage("/map/map-0-1.webp");
  const [map_1_1] = useImage("/map/map-1-1.webp");
  const [map_2_1] = useImage("/map/map-2-1.webp");
  const [map_3_1] = useImage("/map/map-3-1.webp");
  const [map_0_2] = useImage("/map/map-0-2.webp");
  const [map_1_2] = useImage("/map/map-1-2.webp");
  const [map_2_2] = useImage("/map/map-2-2.webp");
  const [map_3_2] = useImage("/map/map-3-2.webp");
  const [map_0_3] = useImage("/map/map-0-3.webp");
  const [map_1_3] = useImage("/map/map-1-3.webp");
  const [map_2_3] = useImage("/map/map-2-3.webp");
  const [map_3_3] = useImage("/map/map-3-3.webp");
  const [mapState, setMapState] = useRecoilState(mainMapStore);
  const [gameState, setGameState] = useRecoilState(tbsStore);
  const cityList = useRecoilValue(getCityList);
  const currentCity = useRecoilValue(getCurrentCity);
  const roadList = useRecoilValue(getRoadList);
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

  return (
    <div id="main-map">
      <KonvaCanvas>
        <Group x={-2048} y={-2048}>
          <Group name="terrain">
            <Image image={map_0_0} x={0} y={0} />
            <Image image={map_1_0} x={1024} y={0} />
            <Image image={map_2_0} x={2048} y={0} />
            <Image image={map_3_0} x={3072} y={0} />
            <Image image={map_0_1} x={0} y={1024} />
            <Image image={map_1_1} x={1024} y={1024} />
            <Image image={map_2_1} x={2048} y={1024} />
            <Image image={map_3_1} x={3072} y={1024} />
            <Image image={map_0_2} x={0} y={2048} />
            <Image image={map_1_2} x={1024} y={2048} />
            <Image image={map_2_2} x={2048} y={2048} />
            <Image image={map_3_2} x={3072} y={2048} />
            <Image image={map_0_3} x={0} y={3072} />
            <Image image={map_1_3} x={1024} y={3072} />
            <Image image={map_2_3} x={2048} y={3072} />
            <Image image={map_3_3} x={3072} y={3072} />
          </Group>
          <Group name="edge">
            {roadList.map((road) => {
              return (
                <Line
                  points={road}
                  stroke="black"
                  key={road.join(",")}
                  strokeWidth={0.5}
                  tension={0.5}
                />
              );
            })}
          </Group>
          <Group name="city">
            {cityList.map((city) => {
              return (
                <Group
                  x={city.posX}
                  y={city.posY}
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
      </KonvaCanvas>
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
