export default class BufferManager {
  constructor() {
    this.buffers = [];
  }

  initBuffer(vertices, itemSize = 3) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = vertices.length / itemSize;
    this.buffers.push(buffer);
    return buffer;
  }
}
