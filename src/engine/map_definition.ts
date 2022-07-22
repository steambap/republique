import { Pos } from "./hex";
import { HeapPriorityQueue } from "../pathfinding/definition";
import { IUnit } from "./unit";

// terrain -1/impossible 0/wood 1/plain 2/water 3/mountain
const terrainCostTable = new Map<number, number>();
terrainCostTable.set(0, 1);
terrainCostTable.set(1, 1);

export interface TerrainTile {
  x: number;
  y: number;
  terrain: number;
  elavation: number;
}

export interface ITileData extends TerrainTile {
  id: string;
}

export interface TerrainTable {
  [id: string]: TerrainTile;
}

export function newTile(x: number, y: number): TerrainTile {
  return {
    x,
    y,
    terrain: 1,
    elavation: 0,
  };
}

export function getTileId(x: number, y: number): string {
  return `${x},${y}`;
}

export function getMovementCost(from: TerrainTile, to: TerrainTile) {
  const climbCost = Math.max(0, to.elavation - from.elavation);
  let terrainCost = -999;
  if (terrainCostTable.has(to.terrain)) {
    terrainCost = terrainCostTable.get(to.terrain) as number;
  }

  return climbCost + terrainCost;
}

export function getCostTable(
  tData: TerrainTable,
  width: number
): Map<string, Map<string, number>> {
  const edges = new Map<string, Map<string, number>>();

  for (const id in tData) {
    const edge = new Map<string, number>();
    const terrain = tData[id];
    // const nbs = new Point(terrain.x, terrain.y).getNeigbours();
    const nbs = Pos.getNeighbors(terrain);

    nbs.forEach((node) => {
      const nodeID = node.y * width + node.x;
      if (!tData[nodeID.toString()]) {
        return;
      }
      const nb = tData[nodeID.toString()];
      const moveCost = getMovementCost(terrain, nb);
      if (moveCost > 0) {
        edge.set(nodeID.toString(), moveCost);
      } // else impossible terrain
    });

    edges.set(id, edge);
  }

  return edges;
}

function getNeigbours(
  edges: Map<string, Map<string, number>>,
  node: string
): Array<string> {
  if (edges.has(node)) {
    const neigbourMap = edges.get(node) as Map<string, number>;
    return [...neigbourMap.keys()];
  }

  return [];
}

export function findReachableCells(
  edges: Map<string, Map<string, number>>,
  originUnit: IUnit,
  unitLoc: Map<string, IUnit>,
  width: number
): Map<string, Array<string>> {
  const { x, y } = originUnit.pos;
  const originNode = (y * width + x).toString();

  const frontier = new HeapPriorityQueue<string>();
  frontier.enqueue(originNode, 0);

  const cameFrom = new Map<string, string>();
  cameFrom.set(originNode, "");
  const costSoFar = new Map<string, number>();
  costSoFar.set(originNode, 0);

  while (frontier.count() !== 0) {
    const current = frontier.dequeue();
    const neigbours = getNeigbours(edges, current);
    neigbours.forEach((nb) => {
      const possibleUnit = unitLoc.get(nb);
      if (possibleUnit && possibleUnit.factionId !== originUnit.factionId) {
        return; // cannot pass through enemy
      }
      let newCost = costSoFar.get(current)! + edges.get(current)!.get(nb)!;
      if (newCost > originUnit.movementPoint) {
        return; // out of range
      }
      let isEnemyZoc = false;
      const nbsOfNode = getNeigbours(edges, nb);
      nbsOfNode.forEach((id) => {
        if (unitLoc.has(id)) {
          const unit = unitLoc.get(id) as IUnit;
          if (unit.factionId !== originUnit.factionId) {
            isEnemyZoc = true;
          }
        }
      });
      // zoc cost all movement
      if (isEnemyZoc) {
        newCost = originUnit.movementPoint;
      }
      if (!costSoFar.has(nb) || newCost < costSoFar.get(nb)!) {
        costSoFar.set(nb, newCost);
        cameFrom.set(nb, current);
        frontier.enqueue(nb, newCost);
      }
    });
  }

  const paths = new Map<string, Array<string>>();
  for (const des of cameFrom.keys()) {
    if (unitLoc.has(des)) {
      continue;
    }
    const path: Array<string> = [];
    let current = des;
    while (current !== originNode) {
      path.push(current);
      current = cameFrom.get(current) as string;
    }
    paths.set(des, path);
  }

  return paths;
}
