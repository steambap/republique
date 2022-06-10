import { useCallback } from "react";
import { produce } from "immer";
import { Group, RegularPolygon, Line } from "react-konva";
import { useRecoilState } from "recoil";
import KonvaCanvas from "./konva_canvas";
import { Pos } from "../engine/hex";
import { hexBattleMapState } from "../stores/hex_battle";
import { size, origin, elavationColor } from "../constants";
import { TerrainTile } from "./components/terrain";
import { Weather } from "./components/weather_tile";

const HexBattle = () => {
  const [hexMapState] = useRecoilState(hexBattleMapState);
  const cellList = Object.keys(hexMapState.terrainData).map((key) => ({
    ...hexMapState.terrainData[key],
    id: key,
  }));

  return (
    <div id="hex-battle">
      <KonvaCanvas>
      <Group name="tiles">
          {cellList.map((d) => {
            const pixel = Pos.add(origin, Pos.toPixel(d, size));

            return (
              <Group
                key={d.id}
                x={pixel.x}
                y={pixel.y}
              >
                <RegularPolygon
                  sides={6}
                  radius={size}
                  fill={elavationColor[d.elavation]}
                  strokeWidth={2}
                  name="elavation"
                />
                <TerrainTile tile={d} />
                <Weather weather={hexMapState.weather} tile={d} />
              </Group>
            );
          })}
        </Group>
      </KonvaCanvas>
    </div>
  );
}

export default HexBattle;
