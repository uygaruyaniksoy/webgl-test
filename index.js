import Base from './src/entities/base';
import BufferManagerClass from './src/opengl/BufferManager';
import DrawManagerClass from './src/opengl/DrawManager';
import EntityManagerClass from './src/opengl/EntityManager';
import GLManagerClass from './src/opengl/GLManager';
import ShaderManagerClass from './src/opengl/ShaderManager';

window.BufferManager = new BufferManagerClass();
window.DrawManager = new DrawManagerClass();
window.EntityManager = new EntityManagerClass();
window.GLManager = new GLManagerClass();
window.ShaderManager = new ShaderManagerClass();

let canvas = document.getElementById("canvas");

window.mvMatrix = mat4.create();
window.pMatrix = mat4.create();

GLManager.init(canvas);
ShaderManager.initShaders();

EntityManager.createEntity(Base, [
    0.0,  1.0,  0.0,
    -1.0, -1.0,  0.0,
    1.0, -1.0,  0.0
  ]);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

DrawManager.loop();
