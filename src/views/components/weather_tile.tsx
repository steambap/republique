import { RegularPolygon } from "react-konva";
import useImage from "use-image";
import { size } from "../../constants";
import { TerrainTile } from "../../engine/map_definition";
import { TWeather } from "../../engine/weather";

interface IWeatherProp {
  weather: TWeather;
  tile: TerrainTile;
}

export const Mud = () => {
  const [image1] = useImage("/tile/mud_002.webp");

  return (
    <RegularPolygon
      sides={6}
      radius={size}
      fillPatternImage={image1}
      fillPatternRepeat="no-repeat"
      fillPatternOffsetX={36}
      fillPatternOffsetY={36}
      listening={false}
      name="weather"
      globalCompositeOperation="multiply"
    />
  );
};

export const HMud = () => {
  const [image1] = useImage("/tile/mud_001.webp");

  return (
    <RegularPolygon
      sides={6}
      radius={size}
      fillPatternImage={image1}
      fillPatternRepeat="no-repeat"
      fillPatternOffsetX={36}
      fillPatternOffsetY={36}
      listening={false}
      name="weather"
      globalCompositeOperation="multiply"
    />
  );
};

export const Snow = () => {
  const [image1] = useImage("/tile/snow_001.webp");

  return (
    <RegularPolygon
      sides={6}
      radius={size}
      fillPatternImage={image1}
      fillPatternRepeat="no-repeat"
      fillPatternOffsetX={36}
      fillPatternOffsetY={36}
      listening={false}
      name="weather"
      globalCompositeOperation="hard-light"
    />
  );
};

export const Weather = ({ weather, tile }: IWeatherProp) => {
  if (weather === "mud") {
    if (tile.terrain !== 2) {
      return <Mud />;
    }
  }
  if (weather === "h.mud") {
    if (tile.terrain !== 2) {
      return <HMud />;
    }
  }
  if (weather === "snow") {
    if (tile.terrain !== 2) {
      return <Snow />;
    }
  }

  return null;
};
