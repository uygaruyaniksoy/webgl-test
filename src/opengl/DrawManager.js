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

      entity.transformations.reverse().forEach((t) => {
        if (t.type === 'ROTATION') mat4.rotate(mvMatrix, Math.min((startTime - t.start) / t.duration, 1) * t.angle * gl.PI / 360, t.axis);
        else if (t.type === 'SCALE') mat4.scale(mvMatrix, Math.min((startTime - t.start) / t.duration, 1) * t.amount, [1, 1, 1]);
        else if (t.type === 'TRANSLATE') mat4.translate(mvMatrix, t.amount.map((a) => a * Math.min((startTime - t.start) / t.duration, 1)));
      });
      entity.transformations.reverse();

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
