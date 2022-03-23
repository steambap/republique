import { useCallback } from 'react';
import { produce } from 'immer';
import { Group, RegularPolygon } from 'react-konva';
import { useRecoilState } from 'recoil';
import { Pos } from '../engine/hex';
import { mapEditorState } from '../stores/map_editor';
import { size, origin, elavationColor } from '../constants';
import { TerrainTile } from './components/terrain';

const MapEditor = () => {
  const [editorState, setEditorState] = useRecoilState(mapEditorState);
  const cellList = Object.keys(editorState.terrainData).map(key => ({
    ...editorState.terrainData[key],
    id: key,
  }));
  const setTile = useCallback((id: string) => {
    if (!editorState.terrainData[id]) {
      console.log('Nonsense location', id);
      return;
    }
    if (editorState.editMode === 'elavation') {
      setEditorState(produce(draft => {
        const tile = draft.terrainData[id];
        tile.elavation = (tile.elavation + 1) % 3;
      }));
    } else if (editorState.editMode === 'terrain') {
      setEditorState(produce(draft => {
        const tile = draft.terrainData[id];
        tile.terrain = editorState.terrainSelect;
      }));
    } else {
      const tile = editorState.terrainData[id];
      console.log(`x:${tile.x}, y:${tile.y}`);
    }
  }, [editorState]);

  return (
    <Group name="tiles">
      {cellList.map((d) => {
        const pixel = Pos.add(origin, Pos.toPixel(d, size));

        return (
          <Group key={d.id} x={pixel.x} y={pixel.y} onClick={() => setTile(d.id)}>
            <RegularPolygon
              sides={6}
              radius={size}
              fill={elavationColor[d.elavation]}
              strokeWidth={2}
              name="elavation"
            />
            <TerrainTile terrain={d.terrain} />
          </Group>
        );
      })}
    </Group>
  );
};

export default MapEditor;
