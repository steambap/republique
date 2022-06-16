export const waterfall = function (fn: Function[], done: Function) {
  fn.length
    ? fn.pop()!(function () {
        waterfall(fn, done);
      })
    : done();
};

export const clamp = function (num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
};

export const delay = (t: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
