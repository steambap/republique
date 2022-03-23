import { RegularPolygon } from "react-konva";
import useImage from "use-image";
import { TerrainTile as ITerrainTile } from "../../engine/map_definition";
import { size } from "../../constants";

interface ITileProp {
  tile: ITerrainTile
}

export const WaterTile = () => (
  <RegularPolygon
    sides={6}
    radius={size}
    fill={"hsl(200,90%,90%)"}
    listening={false}
    name="terrain"
  />
);

export const WoodTile = ({ tile }: ITileProp) => {
  const [image1] = useImage("/tile/woods_061.webp");
  const [image2] = useImage("/tile/woods_062.webp");
  const image = (tile.x + tile.y) % 2 === 0 ? image1 : image2;

  return (
    <RegularPolygon
      sides={6}
      radius={size}
      fillPatternImage={image}
      fillPatternRepeat="no-repeat"
      fillPatternOffsetX={36}
      fillPatternOffsetY={36}
      listening={false}
      name="terrain"
    />
  );
};

export const PeakTile = () => (
  <RegularPolygon
    sides={3}
    radius={size / 4}
    fill="black"
    listening={false}
    name="terrain"
  />
);

export const TerrainTile = ({ tile }: ITileProp) => {
  if (tile.terrain === 0) {
    return <WoodTile tile={tile} />;
  }
  if (tile.terrain === 2) {
    return <WaterTile />;
  }
  if (tile.terrain === 3) {
    return <PeakTile />;
  }

  return null;
};
