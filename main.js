import * as three from "three"

async function loadShader(src){
    const response = await fetch(src)
    if (!response.ok) {throw new Error(`error, failed to load shader from ${src}`)}
    return await response.text()
}

async function init() {
    const vertexShader = await loadShader("shader.vert")
    const fragmentShader = await loadShader("shader.frag")

    // canvas and renderer 
    const root = document.documentElement
    const canvasWidth = 400;
    const canvasHeight = 400;
    root.style.setProperty("--dynamic-width", `${canvasWidth}px`)
    root.style.setProperty("--dynamic-height", `${canvasHeight}px`)

    const canvas = document.querySelector("#canva")
    const renderer = new three.WebGLRenderer({canvas, antialias : true})
    renderer.setSize(canvasWidth, canvasHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // camera and scene
    const scene = new three.Scene()
    const camera = new three.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    
    // Shader Uniforms (Data passed from JS to GLSL)
    const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new three.Vector2(canvasWidth, canvasHeight) }
    };
    
    // create the mesh
    const geometry = new three.PlaneGeometry(2, 2)
    const material = new three.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms
    })
    const mesh = new three.Mesh(geometry, material)
    scene.add(mesh);
    // handle window resizing
    
    // animation loop
    const clock = new three.Clock()
    
    function animate(){
        requestAnimationFrame(animate)
    
        uniforms.u_time.value = clock.getElapsedTime()
        // render
        renderer.render(scene, camera)
    }
    
    animate()
}

init().catch((err) => console.log("error while launching app: ", err))
