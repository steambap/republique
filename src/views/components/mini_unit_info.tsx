import { Unit } from "../../engine/unit";
import { TerrainTile } from "../../engine/map_definition";

interface IProps {
  unit: Unit;
  tile: TerrainTile;
}

const MiniUnitInfo = ({ unit, tile }: IProps) => {
  return (
    <div className="text-left pl-2 pb-4">
      <div>{`#${unit.id} (${unit.factionId})`}</div>
      <div>{unit.name}</div>
      <br />
      <div>{`${unit.hp} men`}</div>
      <div>{`moral: ${unit.moral}`}</div>
      <div>{`Cohesion: ${unit.cohesion} / ${unit.maxCohesion}`}</div>
      <div>---</div>
      <div>
        <label className="block mb-2">
          Terrain:
          <select value={tile.terrain}>
            <option value={0}>Wood</option>
            <option value={1}>Plain</option>
          </select>
        </label>
        <label className="block mb-2">
          Elavation:
          <select value={tile.elavation}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default MiniUnitInfo;
