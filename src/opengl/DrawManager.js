export default class DrawManager {
  constructor() {
    this.frame = { number: 0 };
  }

  static setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
  }

  draw(loop) {
    let startTime, endTime;
    startTime = Date.now();

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    EntityManager.entities.forEach((entity) => {

      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, [-1, 0.0, -7.0]);
      mat4.rotate(mvMatrix, this.frame.number / 360, [0, 0, 1]);

      gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, entity.buffer.itemSize, gl.FLOAT, false, 0, 0);
      DrawManager.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, entity.buffer.numItems);
    });


    endTime = Date.now();
    if (!loop) return;

    this.frame.number++;
    if (endTime - startTime > 16) this.draw(true);
    else setTimeout(() => { this.draw(true); }, startTime + 16 - endTime);
  }

  loop() {
    this.draw(true);
  }
}
