import { useCallback } from 'react';
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
      const tile = editorState.terrainData[id];
      const newTile = {...tile, elavation: (tile.elavation + 1) % 4 };
      setEditorState({
        ...editorState,
        terrainData: {
          ...editorState.terrainData,
          id: newTile,
        },
      });
    } else if (editorState.editMode === 'terrain') {
      const tile = editorState.terrainData[id];
      const newTile = {...tile, terrain: editorState.terrainSelect };
      setEditorState({
        ...editorState,
        terrainData: {
          ...editorState.terrainData,
          id: newTile,
        },
      });
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
