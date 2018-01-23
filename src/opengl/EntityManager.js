export default class EntityManager {
  constructor() {
    this.entities = [];
  }

  createEntity(Type, vertices) {
    let entity = new Type(vertices);
    this.entities.push(entity);
    entity.buffer = BufferManager.initBuffer(vertices);
  }

}
