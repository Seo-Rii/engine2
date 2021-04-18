import { xRotate, yRotate, zRotate, translate } from "./translate.js";

function nearColor(color) {
  const maxDiff = 30;
  let r = color[0],
    g = color[1],
    b = color[2];
  r += Math.random() * maxDiff * 2 - maxDiff;
  g += Math.random() * maxDiff * 2 - maxDiff;
  b += Math.random() * maxDiff * 2 - maxDiff;
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  if (r > 255) r = 255;
  if (g > 255) g = 255;
  if (b > 255) b = 255;
  return [r, g, b];
}

export class Polygon {
  faces = [];
  colors = [];
  positionBuffer = null;
  colorBuffer = null;

  speed = [0, 0, 0];
  rSpeed = [0, 0, 0];

  pos = [0, 0, 0];
  th = [0, 0, 0];

  polygonCount = 0;

  constructor(gl, faces, pos = [0, 0, 0]) {
    this.faces = faces;
    this.polygonCount = faces.length;
    this.pos = pos;

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.faces.flat(2)),
      gl.STATIC_DRAW
    );

    let baseColor = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ];

    for (let i = 0; i < this.polygonCount; i++) {
      let polygonCl = nearColor(baseColor);
      this.colors.push(polygonCl);
      this.colors.push(polygonCl);
      this.colors.push(polygonCl);
    }

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint8Array(this.colors.flat()),
      gl.STATIC_DRAW
    );
  }

  setPosition(pos) {
    this.pos = pos;
  }

  getMatrix(viewMatrix) {
    let matrix = translate(viewMatrix, this.pos[0], this.pos[1], this.pos[2]);
    matrix = xRotate(matrix, this.th[0]);
    matrix = yRotate(matrix, this.th[1]);
    matrix = zRotate(matrix, this.th[2]);
    return matrix;
  }

  addSpeed(speed) {
    this.speed[0] += speed[0];
    this.speed[1] += speed[1];
    this.speed[2] += speed[2];
  }

  move(dt) {
    this.pos[0] += dt * this.speed[0];
    this.pos[1] += dt * this.speed[1];
    this.pos[2] += dt * this.speed[2];
    this.th[0] += dt * this.rSpeed[0];
    this.th[1] += dt * this.rSpeed[1];
    this.th[2] += dt * this.rSpeed[2];
  }
}
