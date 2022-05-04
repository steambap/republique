import { IPos } from "./hex";
import { IElement } from "./elements";
import { ITableOfElm, newElmsFromTOE, InfantryDivision } from "./toe";

export type TSpecial = "none" | "guard" | "elite" | "special" | "volunteer";

export interface IUnit {
  pos: IPos;
  id: string;
  name: string;
  factionId: string;

  cohesion: number;
  maxCohesion: number;
  movementPoint: number;
  moral: number;
  special: TSpecial;
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
  options: Partial<IUnit>
): IUnit {
  const id = gid();
  const elements = newElmsFromTOE(toe, id, options.moral);

  return {
    name: "",
    cohesion: 60,
    maxCohesion: 60,
    movementPoint: 6,
    moral: 50,
    special: "none",
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
  [id: string]: IUnit;
}

function getHP(unit: IUnit): number {
  return unit.elements.reduce((prev, cur) => {
    return cur.hp + prev;
  }, 0);
}

function getAvgExp(unit: IUnit): number {
  const hp = getHP(unit);
  if (hp <= 0) {
    return 0;
  }
  let exps = 0;
  unit.elements.forEach((elm) => {
    exps += elm.hp * elm.experience;
  });

  return Math.floor(exps / hp);
}

export const Unit = {
  getHP,
  getAvgExp,
};
