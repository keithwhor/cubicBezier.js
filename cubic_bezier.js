function cubicBezier(p0, p1, p2, p3) {

  var coords = {
    'ease': [[0.25, 0.1], [0.25, 1]],
    'linear': [[0, 0], [1, 1]],
    'ease-in': [[0.42, 0], [1, 1]],
    'ease-out': [[0, 0], [0.58, 1]],
    'ease-in-out': [[0.42, 0], [0.58, 1.0]]
  }[p0] || [[p0, p1], [p2, p3]];

  this.coords = [[0, 0]].concat(coords, [[1, 1]]);

}

cubicBezier.prototype.B = function(t, i) {

  var p = this.coords.map(function(coord) { return coord[i]; });

  return (Math.pow(1 - t, 3) * p[0]) +
    (3 * Math.pow(1 - t, 2) * t * p[1]) +
    (3 * (1 - t) * Math.pow(t, 2) * p[2]) +
    (Math.pow(t, 3) * p[3]);

};

cubicBezier.prototype.y = function(x) {

  x = Math.max(0, Math.min(1, x)) || 0;

  if (x === 0 || x === 1) {
    return x;
  }

  var n = 2;
  var t = 1 / n;
  var dx;

  while ((dx = this.B(t, 0) - x), n && (Math.abs(dx) > 0.001)) {

    n = (n << 1) & 0x7FFFFFFF;
    t += [1, -1][(dx > 0) | 0] * (1 / n);

  }

  return this.B(t, 1);

};
