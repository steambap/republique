import { IUnit, Unit } from "../../engine/unit";
import { TerrainTile } from "../../engine/map_definition";

interface IProps {
  unit: IUnit;
  tile: TerrainTile;
}

const MiniUnitInfo = ({ unit, tile }: IProps) => {
  return (
    <div className="text-left pl-2 pb-4">
      <div>{`#${unit.id} (${unit.factionId})`}</div>
      <div>{unit.name}</div>
      <br />
      <div>{`${Unit.getHP(unit)} men`}</div>
      <div>{`Moral: ${unit.moral}`}</div>
      <div>{`Exp: ${Unit.getAvgExp(unit)}`}</div>
      <div>{`Cohesion: ${unit.cohesion.toFixed(2)} / ${unit.maxCohesion}`}</div>
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
