import { RegularPolygon } from "react-konva";
import useImage from "use-image";
import { bTypeData, TBuilding } from "../../engine/building";
import { size } from "../../constants";

interface props {
  type: TBuilding;
}

export const BuildingTile = ({ type }: props) => {
  const [image1] = useImage("/building/textile.webp");

  return (
    <RegularPolygon
      sides={6}
      radius={size}
      fillPatternImage={image1}
      fillPatternRepeat="no-repeat"
      fillPatternOffsetX={36}
      fillPatternOffsetY={36}
      listening={false}
      name="building"
    />
  );
};
