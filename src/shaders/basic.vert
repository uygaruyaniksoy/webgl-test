attribute vec3 position;

uniform mat4 modelview;
uniform mat4 projection;

void main(void) {
    gl_Position = projection * modelview * vec4(position, 1.0);
}
