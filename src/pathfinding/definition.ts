export class PriorityQueueNode<T> {
  readonly item: T;
  readonly priority: number;

  constructor(item: T, priority: number) {
    this.item = item;
    this.priority = priority;
  }

  compare(other: PriorityQueueNode<T>): number {
    return this.priority - other.priority;
  }
}

export class HeapPriorityQueue<T> {
  readonly queue: Array<PriorityQueueNode<T>>;

  constructor() {
    this.queue = [];
  }

  count(): number {
    return this.queue.length;
  }

  enqueue(item: T, priority: number) {
    const _q = this.queue;
    _q.push(new PriorityQueueNode<T>(item, priority));
    let ci: number = _q.length - 1;
    while (ci > 0) {
      const pi = (ci - 1) >> 1;
      if (_q[ci].compare(_q[pi]) >= 0) {
        break;
      }
      const tmp = _q[ci];
      _q[ci] = _q[pi];
      _q[pi] = tmp;
    }
  }

  dequeue(): T {
    const _q = this.queue;
    let li = _q.length - 1;
    const frontItem = _q[0];
    _q[0] = _q[li];
    _q.pop();

    --li;
    let pi = 0;
    while (true) {
      let ci = pi * 2 + 1;
      if (ci > li) break;
      const rc = ci + 1;
      if (rc <= li && _q[rc].compare(_q[ci]) < 0) {
        ci = rc;
      }
      if (_q[pi].compare(_q[ci]) <= 0) break;
      const tmp = _q[ci];
      _q[ci] = _q[pi];
      _q[pi] = tmp;
      pi = ci;
    }

    return frontItem.item;
  }
}
