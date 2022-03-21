import { HeapPriorityQueue } from './definition';

// Dijkstra pathfinding
export class Dijkstra {
  findAllPaths(edges: Map<string, Map<string, number>>, originNode: string): Map<string, Array<string>> {
    const frontier = new HeapPriorityQueue<string>();
    frontier.enqueue(originNode, 0);

    const cameFrom = new Map<string, string>();
    cameFrom.set(originNode, "");
    const costSoFar = new Map<string, number>();
    costSoFar.set(originNode, 0);

    while (frontier.count() !== 0) {
      const current = frontier.dequeue();
      const neigbours = this.getNeigbours(edges, current);
      neigbours.forEach(nb => {
        const newCost = costSoFar.get(current) || 0 + (edges.get(current)?.get(nb) || 0);
        if (!costSoFar.has(nb) || newCost < (costSoFar.get(nb) || 0)) {
          costSoFar.set(nb, newCost);
          cameFrom.set(nb, current);
          frontier.enqueue(nb, newCost);
        }
      });
    }

    const paths = new Map<string, Array<string>>();
    for (const des of cameFrom.keys()) {
      const path: Array<string> = [];
      let current = des;
      while (current !== originNode) {
        path.push(current);
        current = cameFrom.get(current)!;
      }
      paths.set(des, path);
    }

    return paths;
  }

  getNeigbours(edges: Map<string, Map<string, number>>, node: string): Array<string> {
    if (edges.has(node)) {
      const neigbourMap = edges.get(node)!;
      return [...neigbourMap.keys()];
    }

    return [];
  }
}

const dijkstra = new Dijkstra();

export const findAllPaths =
  (edges: Map<string, Map<string, number>>, originNode: string):
    Map<string, Array<string>> => {
    return dijkstra.findAllPaths(edges, originNode);
  };
