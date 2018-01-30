export default class Base {
  constructor(vertices, indices) {
    this.vertices = vertices;
    this.indices = indices;
    this.transformations = [];
  }

  rotate(angle, axis, mode, second = 0) {
    this.transformations.push({
      angle,
      axis,
      duration: second * 1000,
      mode,
      start: Date.now(),
      type: 'ROTATION'
    });
    return this;
  }

  translate(amount, mode, second = 0) {
    this.transformations.push({
      amount,
      duration: second * 1000,
      mode,
      start: Date.now(),
      type: 'TRANSLATE'
    });
    return this;
  }

  scale(amount, mode, second = 0) {
    this.transformations.push({
      amount,
      duration: second * 1000,
      mode,
      start: Date.now(),
      type: 'SCALE'
    });
    return this;
  }

  static rotationThisFrame(t, start) {
    let limit = 1;
    if ((t.mode & gl.INFINITE) > 0) limit = Infinity;
    let x = Math.min((start - t.start) / t.duration, limit);
    if ((t.mode & gl.EASEIN) > 0 && x < 0.5) x *= 2 * x;
    if ((t.mode & gl.EASEOUT) > 0 && x >= 0.5) x = (-2 * x * x) + (4 * x) - 1;
    return x * t.angle * gl.PI / 180;
  }

  static scalingThisFrame(t, start) {
    let limit = 1;
    if ((t.mode & gl.INFINITE) > 0) limit = Infinity;
    let x = Math.min((start - t.start) / t.duration, limit);
    if ((t.mode & gl.EASEIN) > 0 && x < 0.5) x *= 2 * x;
    if ((t.mode & gl.EASEOUT) > 0 && x >= 0.5) x = (-2 * x * x) + (4 * x) - 1;
    return [1, 1, 1].map(() => x * t.amount);
  }

  static translationThisFrame(t, start) {
    let limit = 1;
    if ((t.mode & gl.INFINITE) > 0) limit = Infinity;
    let x = Math.min((start - t.start) / t.duration, limit);
    if ((t.mode & gl.EASEIN) > 0 && x < 0.5) x *= 2 * x;
    if ((t.mode & gl.EASEOUT) > 0 && x >= 0.5) x = (-2 * x * x) + (4 * x) - 1;
    return t.amount.map((a) => a * x);
  }

}
