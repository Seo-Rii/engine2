import {
  translate,
  perspective,
  multiply,
  inverse,
  yRotation,
  lookAt,
} from "./translate.js";

export function draw(gl, program, attributes, polygon) {
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(program);

  gl.enableVertexAttribArray(attributes.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, polygon.positionBuffer);
  gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(attributes.color);
  gl.bindBuffer(gl.ARRAY_BUFFER, polygon.colorBuffer);
  gl.vertexAttribPointer(attributes.color, 3, gl.UNSIGNED_BYTE, true, 0, 0);

  let cameraMatrix = yRotation(0);
  cameraMatrix = translate(cameraMatrix, 0, 0, 500);

  let cameraPosition = [cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]];

  cameraMatrix = lookAt(cameraPosition, [0, 0, 0], [0, 1, 0]);

  let viewMatrix = multiply(
    perspective(4.8, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 2000),
    inverse(cameraMatrix)
  );

  gl.uniformMatrix4fv(attributes.matrix, false, polygon.getMatrix(viewMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, 3 * polygon.polygonCount);
}
