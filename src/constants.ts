import { IPos } from "./engine/hex";

export const size = 48;
export const origin: IPos = { x: 120, y: 80 };
export const elavationColor = [
  "hsl(69,13%,84%)",
  "hsl(34,40%,80%)",
  "hsl(30,52%,75%)",
  "hsl(36,69%,63%)",
];
export const terrainNameMap = new Map<number, string>();
// terrainNameMap.set(-1, "impossible");
terrainNameMap.set(0, "wood");
terrainNameMap.set(1, "plain");
terrainNameMap.set(2, "water");
terrainNameMap.set(3, "peak");
terrainNameMap.set(4, "steppe");
terrainNameMap.set(5, "marsh");
terrainNameMap.set(6, "rocky");
terrainNameMap.set(7, "tundra");
terrainNameMap.set(10, "city");
terrainNameMap.set(11, "urban");
