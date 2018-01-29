attribute vec3 position;
attribute vec3 normal;

uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 normalMatrix;

varying vec3 normalInterp;
varying vec3 vertPos;

// uniform vec4 LightPosition; // Light position in eye coords.
vec3 LightPosition = vec3(0, 2, 0); // Light position in eye coords.
// uniform vec3 Kd; // Diffuse reflectivity
// uniform vec3 Ld; // Light source intensity
vec3 Kd = vec3(0.0, 1.0, 1.0); // Diffuse reflectivity
vec3 Ld = vec3(25, 25, 25); // Light source intensity

void main(void) {
  vec4 vertPos4 = modelview * vec4(position, 1.0);
  vertPos = vec3(vertPos4) / vertPos4.w;
  normalInterp = vec3(normalMatrix * vec4(normal, 0.0));

  gl_Position = projection * modelview * vec4(position, 1.0);
}
