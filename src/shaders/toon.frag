precision mediump float;

uniform vec3 cameraPos;

varying vec3 normalInterp;
varying vec3 vertPos;
float uTones = 5.0;

const vec3 lightPos = vec3(0.0, 2.0, 0.0);
const vec3 ambientColor = vec3(0.1, 0.0, 0.0);
const vec3 diffuseColor = vec3(0.5, 0.0, 0.0);
const vec3 specColor = vec3(1.0, 1.0, 1.0);

void main() {
  // ambient term
  vec3 ambient = ambientColor;

  // diffuse term
  vec3 normal = normalize(normalInterp);
  vec3 light = normalize(lightPos - vertPos);
  float lambert = max(0.0, dot(normal,light));
  float tone = floor(lambert * uTones);
  lambert = tone / uTones;
  vec3 diffuse = diffuseColor * lambert; // diffuse term

  // specular term
  vec3 eye = normalize(cameraPos - vertPos);
  vec3 halfVec = normalize(light + eye);
  float highlight = pow(max(0.0, dot(normal, halfVec)),20.0);
  tone = floor(highlight * 20.0);
  highlight = tone / 20.0;
  vec3 specular = specColor* highlight; // specular term

  // combine to find lit color
  vec3 litColor = ambient + diffuse + specular;

  gl_FragColor = vec4(litColor, 1.0);
}
