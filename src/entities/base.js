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
    return Math.min((start - t.start) / t.duration, limit) * t.angle * gl.PI / 180;
  }

  static scalingThisFrame(t, start) {
    let limit = 1;
    if ((t.mode & gl.INFINITE) > 0) limit = Infinity;
    return [1, 1, 1].map(() => Math.min((start - t.start) / t.duration, limit) * t.amount);
  }

  static translationThisFrame(t, start) {
    let limit = 1;
    if ((t.mode & gl.INFINITE) > 0) limit = Infinity;
    return t.amount.map((a) => a * Math.min((start - t.start) / t.duration, limit));
  }

}
