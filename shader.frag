uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;

void main() {
    // Normalize coordinates (0.0 to 1.0)
    vec2 uv = vUv;
    
    // Create a simple animated color pattern using time and coordinates
    vec3 color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));

    gl_FragColor = vec4(color, 1.0);
}
