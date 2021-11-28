class Hex {
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
}

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toPixel(size: number): Point {
    const x = size * Math.sqrt(3) * (this.y + 0.5 * (this.x & 1));
    const y = size * 3 / 2 * this.x;

    return new Point(x, y);
  }

  add(b: Point): Point {
    return new Point(this.x + b.x, this.y + b.y);
  }

  multiply(k: number): Point {
    return new Point(this.x * k, this.y * k);
  }
}

const DIRECTIONS = [
  new Hex(1, 0, -1),
  new Hex(1, -1, 0),
  new Hex(0, -1, 1),
  new Hex(-1, 0, 1),
  new Hex(-1, 1, 0),
  new Hex(0, 1, -1)
];

export {
  Hex,
  Point,
  DIRECTIONS,
};
