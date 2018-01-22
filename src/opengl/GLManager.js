export default class GLManager {
  init(canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    try {
      window.gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!window.gl) {
      alert("Could not initialise WebGL, sorry :-(");
    }
    this.canvas = canvas;
  }
}
