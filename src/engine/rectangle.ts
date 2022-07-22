import { IPos } from "./hex";

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function contains(rect: IRect, pos: IPos): boolean {
  if (rect.width <= 0 || rect.height <= 0) {
    return false;
  }

  return (
    rect.x <= pos.x &&
    rect.x + rect.width >= pos.x &&
    rect.y <= pos.y &&
    rect.y + rect.height >= pos.y
  );
}

export const Rect = {
  contains,
};
