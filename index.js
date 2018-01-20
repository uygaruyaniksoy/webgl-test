import GLManager from './src/opengl/GLManager';
import ShaderManager from './src/opengl/ShaderManager';
import BufferManager from './src/opengl/BufferManager';
import DrawManager from './src/opengl/DrawManager';

window.GLManager = GLManager;
window.ShaderManager = ShaderManager;
window.BufferManager = BufferManager;
window.DrawManager = DrawManager;

var canvas = document.getElementById("canvas");
var shaderProgram;

window.mvMatrix = mat4.create();
window.pMatrix = mat4.create();

window.triangleVertexPositionBuffer = undefined;
window.squareVertexPositionBuffer = undefined;

GLManager.init(canvas);
ShaderManager.initShaders();
BufferManager.initBuffers();

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

DrawManager.loop();
