import { RegularPolygon } from 'react-konva';
import useImage from 'use-image';
import { size } from '../../constants';

export const WaterTile = () => (
  <RegularPolygon
    sides={6}
    radius={size}
    fill={"hsl(200,90%,90%)"}
    listening={false}
    name="terrain"
  />
)

export const WoodTile = () => {
  const [image] = useImage('/tile/woods_062.webp');
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
}

export const PeakTile = () => (
  <RegularPolygon
    sides={3}
    radius={size / 4}
    fill="black"
    listening={false}
    name="terrain"
  />
)

export const TerrainTile = ({ terrain }: {terrain: number}) => {
  if (terrain === 0) {
    return <WoodTile />
  }
  if (terrain === 2) {
    return <WaterTile />
  }
  if (terrain === 3) {
    return <PeakTile />
  }

  return null;
};
