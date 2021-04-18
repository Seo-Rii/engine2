import { createShader, createProgram } from "./src/build_shader.js";
import vertexShaderSrc from "./src/shader/vertex_shader.js";
import fragmentShaderSrc from "./src/shader/fragment_shader.js";
import { draw } from "./src/draw.js";
import { Polygon } from "./src/polygon.js";
import cobj from "./model/cube.js";
import fobj from "./model/F.js";
import ground from "./model/ground.js";

let app, gl, program, attributes, fpsCounter;
let pol = [];
let lastTime;

let gravity = [0, 0.01, 0];

document.addEventListener("DOMContentLoaded", init);

function init() {
  app = document.getElementById("app");
  fpsCounter = document.getElementById("fpsCounter");
  app.width = document.documentElement.offsetWidth;
  app.height = document.documentElement.offsetHeight;
  gl = app.getContext("webgl");
  if (!gl) {
    console.error("WebGL is not Defined!");
    return;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSrc
  );
  program = createProgram(gl, vertexShader, fragmentShader);

  attributes = {
    color: gl.getAttribLocation(program, "a_color"),
    position: gl.getAttribLocation(program, "a_position"),
    matrix: gl.getUniformLocation(program, "u_matrix"),
  };

  pol.push(new Polygon(gl, ground(), [0, 0, 0]));
  pol.push(new Polygon(gl, fobj(), [0, -300, 0]));
  pol.push(new Polygon(gl, cobj(), [120, -300, 0]));

  lastTime = Date.now();

  loop();
}

function loop() {
  let nowTime = Date.now(),
    timeDiff = nowTime - lastTime;
  fpsCounter.innerText = `${(1000 / timeDiff).toFixed(0)}fps`;
  for (let i of pol) i.addSpeed(gravity);
  for (let i of pol) i.move(timeDiff);
  for (let i of pol) {
    if (i.pos[1] > 0) {
      i.pos[1] = 0;
      i.speed[1] *= -0.8;
    }
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for (let i of pol) draw(gl, program, attributes, i);
  requestAnimationFrame(loop);
  lastTime = nowTime;
}
