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

    GLManager.setConstants();
  }

  static setConstants() {
    gl.PI = 3.1415;

    gl.INFINITE = 1;
    gl.EASEIN = 2;
    gl.EASEOUT = 4;
  }
}
