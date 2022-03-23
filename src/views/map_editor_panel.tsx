import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { getTileId, TerrainTable } from "../engine/map_definition";
import {
  mapEditorState,
  TEditMode,
  newTerrainTable,
} from "../stores/map_editor";

const MapEditorPanel = () => {
  const [exportTxt, setTxt] = useState("");
  const [sizeX, setSizeX] = useState(10);
  const [sizeY, setSizeY] = useState(10);
  const [editorState, setEditorState] = useRecoilState(mapEditorState);
  const setEditMode = useCallback(
    (editMode: TEditMode) => {
      setEditorState({
        ...editorState,
        editMode,
      });
    },
    [editorState]
  );
  const setTerrain = useCallback(
    (terrainSelect: number) => {
      setEditorState({
        ...editorState,
        terrainSelect,
      });
    },
    [editorState]
  );
  const setMap = useCallback(() => {
    setEditorState({
      ...editorState,
      terrainData: newTerrainTable(sizeX, sizeY),
    });
  }, [sizeX, sizeY]);
  const setExport = useCallback(() => {
    const tiles = editorState.terrainData;
    const exportTiles: TerrainTable = {};
    Object.values(tiles).forEach((tile) => {
      exportTiles[getTileId(tile.x, tile.y)] = tile;
    });

    const txt = JSON.stringify(
      {
        width: editorState.width,
        height: editorState.height,
        data: exportTiles,
      },
      null,
      2
    );
    setTxt(txt);
  }, [editorState]);

  return (
    <div className="bg-slate-200 w-[300px] fixed top-0 right-0 bottom-0">
      <div className="py-2">Map Editor</div>
      <div>
        <input
          type="number"
          value={sizeX}
          onChange={(e) => setSizeX(Number(e.target.value))}
          min="7"
          max="21"
          className="bg-slate-500 text-white pl-2 pr-0.5 py-0.5 rounded"
        />
        x
        <input
          type="number"
          value={sizeY}
          onChange={(e) => setSizeY(Number(e.target.value))}
          min="7"
          max="21"
          className="bg-slate-500 text-white pl-2 pr-0.5 py-0.5 rounded"
        />
        <button className="button ml-1" type="button" onClick={() => setMap()}>
          set
        </button>
      </div>
      <div>tools</div>
      <div>
        <button
          onClick={() => setEditMode("select")}
          disabled={editorState.editMode === "select"}
          className="button ml-2 mb-1"
        >
          select
        </button>
        <button
          onClick={() => setEditMode("terrain")}
          disabled={editorState.editMode === "terrain"}
          className="button ml-2 mb-1"
        >
          terrain
        </button>
        <button
          onClick={() => setEditMode("elavation")}
          disabled={editorState.editMode === "elavation"}
          className="button ml-2 mb-1"
        >
          elavation
        </button>
        <button
          onClick={() => setEditMode("road")}
          disabled={editorState.editMode === "road"}
          className="button ml-2 mb-1"
        >
          road
        </button>
      </div>
      {editorState.editMode === "terrain" && <div>Please select a terrain</div>}
      {editorState.editMode === "terrain" && (
        <div>
          <label>
            <input
              onChange={() => setTerrain(0)}
              type="radio"
              name="terrainSelect"
              checked={editorState.terrainSelect === 0}
              value="0"
            />
            Wood
          </label>
          <label>
            <input
              onChange={() => setTerrain(1)}
              type="radio"
              name="terrainSelect"
              checked={editorState.terrainSelect === 1}
              value="1"
            />
            Plain
          </label>
          <label>
            <input
              onChange={() => setTerrain(2)}
              type="radio"
              name="terrainSelect"
              checked={editorState.terrainSelect === 2}
              value="2"
            />
            Water
          </label>
          <label>
            <input
              onChange={() => setTerrain(3)}
              type="radio"
              name="terrainSelect"
              checked={editorState.terrainSelect === 3}
              value="3"
            />
            Peak
          </label>
        </div>
      )}
      <div className="mt-2">options</div>
      <div>
        <button onClick={setExport} className="button mb-1">
          export
        </button>
        <br />
        <textarea
          value={exportTxt}
          readOnly
          rows={10}
          className="bg-slate-500 text-white p-0.5 rounded"
        ></textarea>
      </div>
    </div>
  );
};

export default MapEditorPanel;
