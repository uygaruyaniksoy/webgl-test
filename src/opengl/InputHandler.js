export default class InputHandler {
  constructor() {
    window.input = document.getElementById('input');
    input.addEventListener('keypress', InputHandler.keyPressHandler, true);
  }

  static keyPressHandler(event) {
    let right = vec3.create();
    console.log(event.key);
    switch (event.key) {
      case 'w':
        camera._position = camera._position.map((p, i) => p + camera._gaze[i] * 0.3);
        break;
      case 's':
        camera._position = camera._position.map((p, i) => p - camera._gaze[i] * 0.3);
        break;
      case 'a':
        vec3.cross(right, camera._gaze, camera._up);
        camera._position = camera._position.map((p, i) => p - right[i] * 0.3);
        break;
      case 'd':
        vec3.cross(right, camera._gaze, camera._up);
        camera._position = camera._position.map((p, i) => p + right[i] * 0.3);
        break;
      default:

    }
    event.stopPropagation();

  }
}
