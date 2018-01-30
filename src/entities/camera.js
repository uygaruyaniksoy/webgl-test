import { Vector3 } from 'three';

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

  position() {
    let pos = vec3.create();
    const interpAmount = (a, t) => a * Math.min((startTime - t.start) / t.duration, 1);
    for (let i = this.transformations.length - 1; i >= 0; i--) {
      let t = this.transformations[i];
      if (t.type === 'TRANSLATE') {
        vec4.add(pos, pos, t.amount.map((a) => interpAmount(a, t)));
      }
    }
    return pos;
  }

  gaze() {
    let gaze = new Vector3(0, 0, -1);
    for (let i = this.transformations.length - 1; i >= 0; i--) {
      let t = this.transformations[i];
      if (t.type === 'ROTATION') {
        gaze.applyAxisAngle(new Vector3(...t.axis), t.angle * Math.min((startTime - t.start) / t.duration, 1) * gl.PI / 180);
      }
    }
    return [gaze.x, gaze.y, gaze.z];
  }

  up() {
    let up = [0, 1, 0];
    // TODO
    return up;
  }

  gazePosition() {
    let gaze = this.gaze();
    let position = this.position();
    let res = [];
    for (let i = 0; i < 3; i++) res[i] = gaze[i] + position[i];
    return res;
  }

}
