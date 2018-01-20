/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GLManager = _interopRequireDefault(__webpack_require__(1));

var _ShaderManager = _interopRequireDefault(__webpack_require__(2));

var _BufferManager = _interopRequireDefault(__webpack_require__(5));

var _DrawManager = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.GLManager = _GLManager.default;
window.ShaderManager = _ShaderManager.default;
window.BufferManager = _BufferManager.default;
window.DrawManager = _DrawManager.default;
var canvas = document.getElementById("canvas");
var shaderProgram;
window.mvMatrix = mat4.create();
window.pMatrix = mat4.create();
window.triangleVertexPositionBuffer = undefined;
window.squareVertexPositionBuffer = undefined;

_GLManager.default.init(canvas);

_ShaderManager.default.initShaders();

_BufferManager.default.initBuffers();

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

_DrawManager.default.loop();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GLManager =
/*#__PURE__*/
function () {
  function GLManager() {
    _classCallCheck(this, GLManager);
  }

  _createClass(GLManager, null, [{
    key: "init",
    value: function init(canvas) {
      try {
        window.gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
      } catch (e) {}

      if (!window.gl) {
        alert("Could not initialise WebGL, sorry :-(");
      }
    }
  }]);

  return GLManager;
}();

exports.default = GLManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shader = _interopRequireDefault(__webpack_require__(3));

var _shader2 = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderManager =
/*#__PURE__*/
function () {
  function ShaderManager() {
    _classCallCheck(this, ShaderManager);
  }

  _createClass(ShaderManager, null, [{
    key: "getShader",
    value: function getShader(gl, shaderType, sourceFile) {
      var str;
      var shader = gl.createShader(shaderType);
      ;
      gl.shaderSource(shader, sourceFile);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    }
  }, {
    key: "initShaders",
    value: function initShaders() {
      var fragmentShader = this.getShader(gl, gl.FRAGMENT_SHADER, _shader.default);
      var vertexShader = this.getShader(gl, gl.VERTEX_SHADER, _shader2.default);
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
  }]);

  return ShaderManager;
}();

exports.default = ShaderManager;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvoid main(void) {\n\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}\n"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BufferManager =
/*#__PURE__*/
function () {
  function BufferManager() {
    _classCallCheck(this, BufferManager);
  }

  _createClass(BufferManager, null, [{
    key: "initBuffers",
    value: function initBuffers() {
      var gl = window.gl;
      triangleVertexPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
      var vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      triangleVertexPositionBuffer.itemSize = 3;
      triangleVertexPositionBuffer.numItems = 3;
      squareVertexPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
      vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      squareVertexPositionBuffer.itemSize = 3;
      squareVertexPositionBuffer.numItems = 4;
    }
  }]);

  return BufferManager;
}();

exports.default = BufferManager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawManager =
/*#__PURE__*/
function () {
  function DrawManager() {
    _classCallCheck(this, DrawManager);
  }

  _createClass(DrawManager, null, [{
    key: "setMatrixUniforms",
    value: function setMatrixUniforms() {
      gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
  }, {
    key: "draw",
    value: function draw() {
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      this.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
      mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      this.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this = this;

      this.frame = {
        number: 0
      };
      this.loopId = setInterval(function () {
        _this.draw();

        _this.frame.number++;
      }, 16);
    }
  }]);

  return DrawManager;
}();

exports.default = DrawManager;

/***/ })
/******/ ]);