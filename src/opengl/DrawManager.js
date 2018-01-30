import Base from '../entities/base';

export default class DrawManager {
  constructor() {
    this.frame = { number: 0 };
  }

  static setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    gl.uniform3fv(shaderProgram.cameraPosUniform, camera._position);
  }

  draw(loop) {
    input.focus(); //TODO probably should remove later
    window.startTime = Date.now();
    let view = mat4.create();

    mat4.lookAt(view, camera._position, camera.gazePosition(), camera.up());

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

    EntityManager.entities.forEach((entity) => {
      mat4.identity(mvMatrix);

      entity.transformations.reverse().forEach((t) => {
        if (t.type === 'ROTATION') mat4.rotate(mvMatrix, mvMatrix, Base.rotationThisFrame(t, startTime), t.axis);
        else if (t.type === 'SCALE') mat4.scale(mvMatrix, mvMatrix, Base.scalingThisFrame(t, startTime));
        else if (t.type === 'TRANSLATE') mat4.translate(mvMatrix, mvMatrix, Base.translationThisFrame(t, startTime));
      });
      entity.transformations.reverse();

      mat4.multiply(mvMatrix, view, mvMatrix);

      EntityManager.camera.transformations.reverse();

      gl.bindBuffer(gl.ARRAY_BUFFER, entity.verticesBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, entity.verticesBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, entity.normalsBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, entity.normalsBuffer.itemSize, gl.FLOAT, false, 0, 0);
      mat4.invert(normalMatrix, mvMatrix);
      mat4.transpose(normalMatrix, normalMatrix);
      DrawManager.setMatrixUniforms();

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, entity.indicesBuffer);
      gl.drawElements(gl.TRIANGLES, entity.indicesBuffer.itemSize * entity.indicesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    });

    window.endTime = Date.now();
    if (!loop) return;

    this.frame.number++;
    if (endTime - startTime > 16) this.draw(true);
    else setTimeout(() => { this.draw(true); }, startTime + 16 - endTime);
  }

  loop() {
    this.draw(true);
  }
}
