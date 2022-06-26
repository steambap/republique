// Konva wrapper
import { ReactChild } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { Stage, Layer } from "react-konva";

interface IProps {
  children: ReactChild | ReactChild[];
  fullscreen: boolean;
}

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const KonvaCanvas = ({ children, fullscreen }: IProps) => {
  const Bridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <Stage width={fullscreen ? innerWidth: undefined} height={fullscreen ? innerHeight: undefined} draggable>
      <Bridge>
        <Layer>{children}</Layer>
      </Bridge>
    </Stage>
  );
};

export default KonvaCanvas;
