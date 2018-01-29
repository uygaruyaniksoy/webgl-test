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
window.normalMatrix = mat4.create();

GLManager.init(canvas);
ShaderManager.initShaders();

EntityManager.createEntity(
  Base,
  [
    0.0,  1.0,  0.0,
    -1.0, -1.0,  0.0,
    1.0, -1.0,  0.0
  ],
  [0, 1, 2],
  [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
  ]
);

EntityManager.createEntity(
  Base,
  [
    -1.0,  1.0,  0.0,
    -1.0, -1.0,  0.0,
    1.0, 1.0,  0.0,
    1.0, -1.0, 0.0
  ],
  [0, 1, 2, 2, 1, 3],
  [
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
  ]
);

EntityManager.entities[0]
  .translate([0, 0, -0.001], 0)
  .rotate(36000, [0, 1, 0], 1000)
  .translate([0, 0, -9.9], 0);

EntityManager.entities[1]
  .scale(15)
  .rotate(90, [1, 0, 0], 0)
  .translate([0, -1, 0], 0);

EntityManager.camera
  // .rotate(360, [1, 0, 0], 10);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

DrawManager.loop();
