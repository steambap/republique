import { useCallback } from "react";
import { produce } from "immer";
import { Group, RegularPolygon, Line } from "react-konva";
import { useRecoilState } from "recoil";
import KonvaCanvas from "./konva_canvas";
import MapEditorPanel from "./map_editor_panel";
import { Pos } from "../engine/hex";
import { mapEditorState } from "../stores/map_editor";
import { size, origin, elavationColor } from "../constants";
import { TerrainTile } from "./components/terrain";
import { Weather } from "./components/weather_tile";

const MapEditor = () => {
  const [editorState, setEditorState] = useRecoilState(mapEditorState);
  const cellList = Object.keys(editorState.terrainData).map((key) => ({
    ...editorState.terrainData[key],
    id: key,
  }));
  const roadIdList = editorState.roadData.filter((road) => road.length > 1);
  const setTile = useCallback(
    (id: string) => {
      if (!editorState.terrainData[id]) {
        console.log("Nonsense location", id);
        return;
      }
      if (editorState.editMode === "elavation") {
        setEditorState(
          produce((draft) => {
            const tile = draft.terrainData[id];
            tile.elavation = (tile.elavation + 1) % 4;
          })
        );
      } else if (editorState.editMode === "terrain") {
        setEditorState(
          produce((draft) => {
            const tile = draft.terrainData[id];
            tile.terrain = editorState.terrainSelect;
          })
        );
      } else if (editorState.editMode === "road") {
        if (editorState.roadMode === "add node") {
          setEditorState(
            produce((draft) => {
              const tailRoad = draft.roadData[draft.roadData.length - 1];
              tailRoad.push(id);
            })
          );
        } else if (editorState.roadMode === "delete node") {
          setEditorState(
            produce((draft) => {
              const tailRoad = draft.roadData[draft.roadData.length - 1];
              const idx = tailRoad.findIndex((el) => el === id);
              tailRoad.splice(idx, 1);
            })
          );
        } else {
          setEditorState(
            produce((draft) => {
              draft.roadData = draft.roadData.filter(
                (road) => !road.includes(id)
              );
              if (draft.roadData.length === 0) {
                draft.roadData = [[]];
              }
            })
          );
        }
      } else {
        const tile = editorState.terrainData[id];
        console.log(`x:${tile.x}, y:${tile.y}, hi:${tile.elavation}`);
      }
    },
    [editorState]
  );

  return (
    <div id="map-editor">
      <KonvaCanvas>
        <Group name="tiles">
          {cellList.map((d) => {
            const pixel = Pos.add(origin, Pos.toPixel(d, size));

            return (
              <Group
                key={d.id}
                x={pixel.x}
                y={pixel.y}
                onClick={() => setTile(d.id)}
              >
                <RegularPolygon
                  sides={6}
                  radius={size}
                  fill={elavationColor[d.elavation]}
                  strokeWidth={2}
                  name="elavation"
                />
                <TerrainTile tile={d} />
                <Weather weather={editorState.weatherPreview} tile={d} />
              </Group>
            );
          })}
          {roadIdList.map((ids) => {
            const points: number[] = [];
            ids.forEach((id) => {
              const tile = editorState.terrainData[id];
              const pixel = Pos.add(origin, Pos.toPixel(tile, size));
              points.push(pixel.x, pixel.y);
            });

            return (
              <Line
                key={ids.join(",")}
                points={points}
                tension={0.5}
                dash={[24, 10, 2, 10]}
                stroke="black"
                strokeWidth={4}
                lineCap="round"
                lineJoin="round"
                listening={false}
              />
            );
          })}
        </Group>
      </KonvaCanvas>
      <MapEditorPanel />
    </div>
  );
};

export default MapEditor;
