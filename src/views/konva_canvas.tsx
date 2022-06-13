// Konva wrapper
import { ReactChild } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { Stage, Layer } from "react-konva";

interface IProps {
  children: ReactChild | ReactChild[];
}

const width = window.innerWidth;
const height = window.innerHeight;

const KonvaCanvas = ({ children }: IProps) => {
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <Stage width={width} height={height} draggable>
      <Bridge>
        <Layer>{children}</Layer>
      </Bridge>
    </Stage>
  );
};

export default KonvaCanvas;
