import { keyBy, forIn } from 'lodash';
import { Group, Image, Circle, Text, Line } from "react-konva";
import useImage from "use-image";
import KonvaCanvas from "./konva_canvas";
import cityData from "../maps/core.json";

const { cityList, edges } = cityData;
const cityTable = keyBy(cityList, "id");

const roadList: number[][] = [];
forIn(edges, (connData, key) => {
  const city1 = cityTable[key];
  const x1 = city1.posX;
  const y1 = city1.posY;

  forIn(connData, (_, cityName) => {
    const city2 = cityTable[cityName];
    const x2 = city2.posX;
    const y2 = city2.posY;

    roadList.push([x1, y1, x2, y2]);
  });
});

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

  return (
    <div id="main-map">
      <KonvaCanvas>
        <Group name="terrain" x={-2048} y={-2048}>
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
        <Group name="edge" x={-2048} y={-2048}>
          {roadList.map(road => {
            return (
              <Line
                points={road}
                stroke="black"
                key={road.join(",")}
                strokeWidth={0.5}
              />
            );
          })}
        </Group>
        <Group name="city" x={-2048} y={-2048}>
          {cityList.map(city => {
            return (
              <Group x={city.posX} y={city.posY} key={city.id}>
                <Text text={city.name} x={-7 * city.name.length} y={-30} fontSize={14} />
                <Circle fill="white" stroke="black" radius={12} strokeWidth={1} />
              </Group>
            );
          })}
        </Group>
      </KonvaCanvas>
    </div>
  );
};

export default MainMap;
