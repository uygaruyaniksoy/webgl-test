import Camera from '../entities/camera';

export default class EntityManager {
  constructor() {
    this.entities = [];
    this.camera = new Camera();
  }

  createEntity(Type, vertices, indices, normals) {
    let entity = new Type(vertices, indices);
    this.entities.push(entity);
    entity.verticesBuffer = BufferManager.initBuffer(gl.ARRAY_BUFFER, Float32Array, vertices);
    entity.indicesBuffer = BufferManager.initBuffer(gl.ELEMENT_ARRAY_BUFFER, Uint16Array, indices);
    entity.normalsBuffer = BufferManager.initBuffer(gl.ARRAY_BUFFER, Float32Array, normals);
  }

}
