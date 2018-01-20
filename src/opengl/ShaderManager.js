import fragmentSource from '../shaders/shader.frag';
import verticeSource from '../shaders/shader.vert';

export default class ShaderManager {
  static getShader(gl, shaderType, sourceFile) {
    let shader = gl.createShader(shaderType);

    gl.shaderSource(shader, sourceFile);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  static initShaders() {
    let fragmentShader = this.getShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    let vertexShader = this.getShader(gl, gl.VERTEX_SHADER, verticeSource);

    window.shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  }
}
