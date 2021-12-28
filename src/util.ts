export const waterfall = function (fn: Function[], done: Function) {
  fn.length ? fn.pop()!(
    function () { waterfall(fn, done); }
  ) : done();
};
