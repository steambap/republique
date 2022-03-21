export interface IPos {
  x: number;
  y: number;
}

export class Hex {
  q: number;
  r: number;
  s: number;
  constructor(q: number, r: number, s: number) {
    if (q + r + s !== 0) {
      throw new Error('not an hex');
    }
    this.q = q;
    this.r = r;
    this.s = s;
  }

  equals(b: Hex): boolean {
    return this.q == b.q && this.r == b.r && this.s == b.s;
  }

  add(b: Hex): Hex {
    return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  multiply(k: number): Hex {
    return new Hex(this.q * k, this.r * k, this.s * k);
  }

  toPoint(): IPos {
    const x = this.q + ((this.r - (this.r & 1)) >> 1);
    const y = this.r;
    return { x, y };
  }
}

export const DIRECTIONS = [
  new Hex(1, 0, -1), // E
  new Hex(1, -1, 0), // NE
  new Hex(0, -1, 1), // NW
  new Hex(-1, 0, 1), // W
  new Hex(-1, 1, 0), // SW
  new Hex(0, 1, -1)  // SE
];

function toPixel(pos: IPos, size: number): IPos {
  const x = size * Math.sqrt(3) * (pos.y + 0.5 * (pos.x & 1));
  const y = size * 3 / 2 * pos.x;

  return { x, y };
}

function add(a: IPos, b: IPos): IPos {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

function toCube(pos: IPos): Hex {
  const q = pos.y - ((pos.x - (pos.x & 1)) >> 1);
  const r = pos.x;

  return new Hex(q, r, -q - r);
}

function getNeighbors(pos: IPos): IPos[] {
  const self = toCube(pos);
  const cubeNeighbors = DIRECTIONS.map(dir => {
    return dir.add(self);
  });

  return cubeNeighbors.map(cube => cube.toPoint());
}

export const Pos = {
  toPixel,
  add,
  toCube,
  getNeighbors,
};
