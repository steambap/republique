// Konva wrapper
import { ReactChild } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { Stage, Layer } from "react-konva";

interface IProps {
  children: ReactChild | ReactChild[];
  width?: number;
  height?: number;
}

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const KonvaCanvas = ({ children, width, height }: IProps) => {
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <Stage width={!width ? innerWidth: width} height={!height ? innerHeight: height} draggable>
      <Bridge>
        <Layer>{children}</Layer>
      </Bridge>
    </Stage>
  );
};

export default KonvaCanvas;
