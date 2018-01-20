import BufferManager from './src/opengl/BufferManager';
import DrawManager from './src/opengl/DrawManager';
import GLManager from './src/opengl/GLManager';
import ShaderManager from './src/opengl/ShaderManager';

window.GLManager = GLManager;
window.ShaderManager = ShaderManager;
window.BufferManager = BufferManager;
window.DrawManager = DrawManager;

let canvas = document.getElementById("canvas");

window.mvMatrix = mat4.create();
window.pMatrix = mat4.create();

window.triangleVertexPositionBuffer = {};
window.squareVertexPositionBuffer = {};

GLManager.init(canvas);
ShaderManager.initShaders();
BufferManager.initBuffers();

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

DrawManager.loop();
