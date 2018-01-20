export default class GLManager {
  static init(canvas) {
    try {
      window.gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!window.gl) {
      alert("Could not initialise WebGL, sorry :-(");
    }
  }
}
