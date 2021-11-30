import { Point } from './hex';
import konva from 'konva';

// terrain -1/impossible 0/wood 1/plain 2/water 3/mountain
export interface TerrainTile {
  x: number;
  y: number;
  terrain: number;
  elavation: number;
}

export interface TerrainTable {
  [id: string]: TerrainTile;
}

export function newTile(x: number, y: number): TerrainTile {
  return {
    x, y,
    terrain: 1,
    elavation: 0
  };
}

export interface Unit {
  pos: konva.Vector2d;
  id: string;
  factionId: string;

  hp: number;
  mp: number;
}

let GID = 0;
export default function gid(): string {
  return (++GID).toString();
}

export function newUnit(pos: konva.Vector2d, factionId: string): Unit {
  const id = gid();

  return {
    pos, id, factionId,
    hp: 100,
    mp: 6
  };
}

export interface UnitTable {
  [id: string]: Unit;
}
