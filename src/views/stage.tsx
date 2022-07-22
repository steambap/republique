// Konva wrapper
import { ReactChild } from "react";
import Konva from "konva";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { Stage, Layer } from "react-konva";

interface IProps {
  children: ReactChild | ReactChild[];
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const KonvaCanvas = ({ children, onDragEnd }: IProps) => {
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <Stage
      onDragEnd={onDragEnd}
      width={innerWidth}
      height={innerHeight}
      draggable
    >
      <Bridge>
        <Layer>{children}</Layer>
      </Bridge>
    </Stage>
  );
};

export default KonvaCanvas;
