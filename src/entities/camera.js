export default class Camera {
  constructor() {
    this.transformations = [];
  }

  rotate(angle, axis, second = 0) {
    this.transformations.push({
      angle,
      axis,
      duration: second * 1000,
      start: Date.now(),
      type: 'ROTATION'
    });
    return this;
  }

  translate(amount, second = 0) {
    this.transformations.push({
      amount,
      duration: second * 1000,
      start: Date.now(),
      type: 'TRANSLATE'
    });
    return this;
  }

  scale(amount, second = 0) {
    this.transformations.push({
      amount,
      duration: second * 1000,
      start: Date.now(),
      type: 'SCALE'
    });
    return this;
  }

}
