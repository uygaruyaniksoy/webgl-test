precision mediump float;

uniform vec3 cameraPos;

varying vec3 normalInterp;
varying vec3 vertPos;

const vec3 lightPos = vec3(0.0, 2.0, 0.0);
const vec3 ambientColor = vec3(0.1, 0.0, 0.0);
const vec3 diffuseColor = vec3(0.5, 0.0, 0.0);
const vec3 specColor = vec3(1.0, 1.0, 1.0);

void main() {
  vec3 normal = normalize(normalInterp);
  vec3 lightDir = normalize(lightPos - vertPos);

  float lambertian = max(dot(lightDir, normal), 0.0);
  float specular = 0.0;

  if (lambertian > 0.0) {
    vec3 viewDir = normalize(cameraPos - vertPos);

    vec3 halfDir = normalize(lightDir + viewDir);
    float specAngle = max(dot(halfDir, normal), 0.0);
    specular = pow(specAngle, 16.0);
    gl_FragColor = vec4(ambientColor +
      lambertian * diffuseColor +
      specular * specColor, 1.0);
  } else {
    gl_FragColor = vec4(0, 0, 0, 1);
    // gl_FragColor = vec4(cameraPos, 1);
  }
}
