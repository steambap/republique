import { IPos } from "./hex";
import { IElement } from "./elements";
import { ITableOfElm, newElmsFromTOE, InfantryDivision } from "./toe";

export interface Unit {
  pos: IPos;
  id: string;
  name: string;
  factionId: string;

  cohesion: number;
  maxCohesion: number;
  movementPoint: number;
  moral: number;
  hp: number;
  hpDamaged: number;
  currentTOE: ITableOfElm;
  nextTOE: ITableOfElm;
  elements: IElement[];
}

let GID = 0;
export default function gid(): string {
  return (++GID).toString();
}

export function newUnit(
  pos: IPos,
  factionId: string,
  toe: ITableOfElm = InfantryDivision,
  options: Partial<Unit>
): Unit {
  const id = gid();
  const elements = newElmsFromTOE(toe);
  const hp = elements.length * 1000;

  return {
    name: "",
    cohesion: 60,
    maxCohesion: 60,
    movementPoint: 6,
    moral: 45,
    hp,
    hpDamaged: 0,
    currentTOE: toe,
    nextTOE: toe,
    elements,
    ...options,
    pos,
    id,
    factionId,
  };
}

export interface UnitTable {
  [id: string]: Unit;
}
