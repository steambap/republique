import { Group, Image } from "react-konva";
import useImage from "use-image";
import KonvaCanvas from "./konva_canvas";

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
        <Group name="terrain">
          <Image image={map_0_0} x={-2048} y={-2048} />
          <Image image={map_1_0} x={-1024} y={-2048} />
          <Image image={map_2_0} x={0} y={-2048} />
          <Image image={map_3_0} x={1024} y={-2048} />
          <Image image={map_0_1} x={-2048} y={-1024} />
          <Image image={map_1_1} x={-1024} y={-1024} />
          <Image image={map_2_1} x={0} y={-1024} />
          <Image image={map_3_1} x={1024} y={-1024} />
          <Image image={map_0_2} x={-2048} y={0} />
          <Image image={map_1_2} x={-1024} y={0} />
          <Image image={map_2_2} x={0} y={0} />
          <Image image={map_3_2} x={1024} y={0} />
          <Image image={map_0_3} x={-2048} y={1024} />
          <Image image={map_1_3} x={-1024} y={1024} />
          <Image image={map_2_3} x={0} y={1024} />
          <Image image={map_3_3} x={1024} y={1024} />
        </Group>
      </KonvaCanvas>
    </div>
  );
};

export default MainMap;
