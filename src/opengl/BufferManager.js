export default class BufferManager {
  constructor() {
    this.buffers = [];
  }

  initBuffer(bufferType, ArrayType, data, itemSize = 3) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, new ArrayType(data), gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = data.length / itemSize;
    this.buffers.push(buffer);
    return buffer;
  }
}
