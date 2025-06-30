function compileShader(gl, vShaderText, fShaderText) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vShaderText);
  gl.shaderSource(fragmentShader, fShaderText);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log("vertex shader ereror");
    var message = gl.getShaderInfoLog(vertexShader);
    console.log(message);
  }

  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log("fragment shader ereror");
    var message = gl.getShaderInfoLog(fragmentShader);
    console.log(message);
  }

  var program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(gl.getProgramInfoLog(program) + "");
    gl.deleteProgram(program);
  }

  return program;
}

function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}

function initArrayBufferForLaterUse(gl, data, num, type) {
  var buffer = gl.createBuffer();

  if (!buffer) {
    console.log("Failed to create the buffer object");
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.num = num;
  buffer.type = type;

  return buffer;
}

function initVertexBufferForLaterUse(gl, vertices, normals, texCoords) {
  var nVertices = vertices.length / 3;

  var o = new Object();

  o.vertexBuffer = initArrayBufferForLaterUse(
    gl,
    new Float32Array(vertices),
    3,
    gl.FLOAT,
  );

  if (normals != null) {
    o.normalBuffer = initArrayBufferForLaterUse(
      gl,
      new Float32Array(normals),
      3,
      gl.FLOAT,
    );
  }
  if (texCoords != null) {
    o.texCoordBuffer = initArrayBufferForLaterUse(
      gl,
      new Float32Array(texCoords),
      2,
      gl.FLOAT,
    );
  }

  o.numVertices = nVertices;

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}

function getNormalOnVertices(vertices) {
  var normals = [];
  var nTriangles = vertices.length / 9;

  for (let i = 0; i < nTriangles; i++) {
    var idx = i * 9 + 0 * 3;
    var p0x = vertices[idx + 0],
      p0y = vertices[idx + 1],
      p0z = vertices[idx + 2];
    idx = i * 9 + 1 * 3;
    var p1x = vertices[idx + 0],
      p1y = vertices[idx + 1],
      p1z = vertices[idx + 2];
    idx = i * 9 + 2 * 3;
    var p2x = vertices[idx + 0],
      p2y = vertices[idx + 1],
      p2z = vertices[idx + 2];

    var ux = p1x - p0x,
      uy = p1y - p0y,
      uz = p1z - p0z;
    var vx = p2x - p0x,
      vy = p2y - p0y,
      vz = p2z - p0z;

    var norm = Math.sqrt(ux * ux + uy * uy + uz * uz);
    ux = ux / norm;
    uy = uy / norm;
    uz = uz / norm;

    norm = Math.sqrt(vx * vx + vy * vy + vz * vz);
    vx = vx / norm;
    vy = vy / norm;
    vz = vz / norm;

    var nx = uy * vz - uz * vy;
    var ny = uz * vx - ux * vz;
    var nz = ux * vy - uy * vx;

    norm = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx = nx / norm;
    ny = ny / norm;
    nz = nz / norm;

    normals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  }

  return normals;
}

var mouseLastX, mouseLastY;
var mouseDragging = false;
var angleX = 90,
  angleY = 0;
var One_angleX = 90,
  One_angleY = 0;
var Three_angleX = 0,
  Three_angleY = 0;

var IsOnePerspective = 1;

var gl, canvas;
var modelMatrix;
var normalMatrix;
var nVertex;
var mvpMatrix;
var cameraX = 4,
  cameraY = -7,
  cameraZ = 25;
var One_cameraX = 4,
  One_cameraY = -7,
  One_cameraZ = 25;
var Three_cameraX = 3,
  Three_cameraY = 3,
  Three_cameraZ = -50;

var cameraDirX = 0,
  cameraDirY = 0,
  cameraDirZ = 1;

var ground = [];
var cat = [];
var screen = [];

var cube = [];
var cubeObj = [];
var quadObj;
var cubeMapTex;
var objScale = 3;
var rotateAngle = 0;

var transformMat = new Matrix4();
var matStack = [];
var u_modelMatrix;

function pushMatrix() {
  matStack.push(new Matrix4(transformMat));
}

function popMatrix() {
  transformMat = matStack.pop();
}

var textures = {};
var imgNames = ["images/cat.png", "images/cube.png"];
var objCompImgIndex = [0, 0, "images/cat.png", "images/cube.png"];
var texCount = 0;
var numTextures = imgNames.length;

var offScreenWidth = 512,
  offScreenHeight = 512;
var fbo;
var downtime = 10000;
var regard_down_time = 10000;
var downshift = 0.01;

function SetProgram(program) {
  gl.useProgram(program);

  program.a_Position = gl.getAttribLocation(program, "a_Position");
  program.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
  program.a_Normal = gl.getAttribLocation(program, "a_Normal");
  program.u_MvpMatrix = gl.getUniformLocation(program, "u_MvpMatrix");
  program.u_modelMatrix = gl.getUniformLocation(program, "u_modelMatrix");
  program.u_normalMatrix = gl.getUniformLocation(program, "u_normalMatrix");
  program.u_LightPosition = gl.getUniformLocation(program, "u_LightPosition");
  program.u_ViewPosition = gl.getUniformLocation(program, "u_ViewPosition");
  program.u_Ka = gl.getUniformLocation(program, "u_Ka");
  program.u_Kd = gl.getUniformLocation(program, "u_Kd");
  program.u_Ks = gl.getUniformLocation(program, "u_Ks");
  program.u_shininess = gl.getUniformLocation(program, "u_shininess");
  program.u_Sampler0 = gl.getUniformLocation(program, "u_Sampler");
}

async function main() {
  canvas = document.getElementById("myCanvas");
  gl = canvas.getContext("webgl2");

  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  var quad = new Float32Array([
    -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1,
  ]);

  programTextureCube = compileShader(
    gl,
    VSHADER_SOURCE_TEXTURE_CUBE,
    FSHADER_SOURCE_TEXTURE_CUBE,
  );
  programTextureCube.a_Position = gl.getAttribLocation(
    programTextureCube,
    "a_Position",
  );
  programTextureCube.a_Normal = gl.getAttribLocation(
    programTextureCube,
    "a_Normal",
  );
  programTextureCube.u_MvpMatrix = gl.getUniformLocation(
    programTextureCube,
    "u_MvpMatrix",
  );
  programTextureCube.u_modelMatrix = gl.getUniformLocation(
    programTextureCube,
    "u_modelMatrix",
  );
  programTextureCube.u_normalMatrix = gl.getUniformLocation(
    programTextureCube,
    "u_normalMatrix",
  );
  programTextureCube.u_ViewPosition = gl.getUniformLocation(
    programTextureCube,
    "u_ViewPosition",
  );
  programTextureCube.u_envCubeMap = gl.getUniformLocation(
    programTextureCube,
    "u_envCubeMap",
  );
  programTextureCube.u_Color = gl.getUniformLocation(
    programTextureCube,
    "u_Color",
  );

  programEnvCube = compileShader(
    gl,
    VSHADER_SOURCE_ENVCUBE,
    FSHADER_SOURCE_ENVCUBE,
  );

  programEnvCube.a_Position = gl.getAttribLocation(
    programEnvCube,
    "a_Position",
  );
  programEnvCube.u_envCubeMap = gl.getUniformLocation(
    programEnvCube,
    "u_envCubeMap",
  );
  programEnvCube.u_viewDirectionProjectionInverse = gl.getUniformLocation(
    programEnvCube,
    "u_viewDirectionProjectionInverse",
  );

  quadObj = initVertexBufferForLaterUse(gl, quad);

  cubeMapTex = initCubeTexture(
    "images/pos-x.png",
    "images/neg-x.png",
    "images/pos-y.png",
    "images/neg-y.png",
    "images/pos-z.png",
    "images/neg-z.png",
    512,
    512,
  );

  program = compileShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  SetProgram(program);

  cat = await loadOBJtoCreateVBO("objs/cat.obj");
  cube = await loadOBJtoCreateVBO("objs/cube.obj");

  for (let i = 0; i < imgNames.length; i++) {
    let image = new Image();

    image.onload = function () {
      initTexture(gl, image, imgNames[i]);
    };

    image.src = imgNames[i];
  }

  fbo = initFrameBufferForCubemapRendering(gl);

  update_status();
  draw();

  canvas.onmousedown = function (ev) {
    mouseDown(ev);
  };
  canvas.onmousemove = function (ev) {
    mouseMove(ev);
  };
  canvas.onmouseup = function (ev) {
    mouseUp(ev);
  };
  document.onkeydown = function (ev) {
    keydown(ev);
  };

  if (IsOnePerspective) {
    One_angleX = angleX;
  } else {
    Three_angleX = angleX;
  }

  var tick = function () {
    rotateAngle -= 0.5;

    draw();
    requestAnimationFrame(tick);
  };

  tick();
}

function drawRegularObjects(vpMatrix) {
  let mdlMatrix_wood = new Matrix4();
  let mdlMatrix_cat = new Matrix4();

  mdlMatrix_wood.translate(6.0, -9.0, 30.0);

  mdlMatrix_cat.translate(One_cameraX, One_cameraY - 2, One_cameraZ);
  mdlMatrix_cat.rotate(One_angleX, 0, 1, 0);
  mdlMatrix_cat.scale(1.0, 1.0, 1.0);

  drawOneRegularObject(ground, mdlMatrix_wood, vpMatrix, 1);
  drawOneRegularObject(cat, mdlMatrix_cat, vpMatrix, 2);
}

function drawOneReflective(obj, vpMatrix) {
  let mdlMatrix = new Matrix4();

  mdlMatrix.translate(-9.0, 10, 0.0);
  mdlMatrix.scale(2.5, 2.5, 2.5);

  var projMatrix = new Matrix4();

  projMatrix.setPerspective(30, 1, 1, 200);

  let rotateMatrix = new Matrix4();

  rotateMatrix.setRotate(angleY, 1, 0, 0);
  rotateMatrix.rotate(angleX, 0, 1, 0);

  var viewDir = new Vector3([cameraDirX, cameraDirY, cameraDirZ]);
  var newViewDir = rotateMatrix.multiplyVector3(viewDir);
  var viewMatrix = new Matrix4();

  viewMatrix.setLookAt(
    cameraX,
    cameraY,
    cameraZ,
    cameraX + newViewDir.elements[0],
    cameraY + newViewDir.elements[1],
    cameraZ + newViewDir.elements[2],
    0,
    1,
    0,
  );

  gl.useProgram(programTextureCube);
  gl.depthFunc(gl.LESS);
  modelMatrix = new Matrix4();
  modelMatrix.multiply(mdlMatrix);
  modelMatrix.rotate(rotateAngle, 1, 1, 1);

  mvpMatrix = new Matrix4();
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
  normalMatrix = new Matrix4();

  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();

  gl.uniform3f(programTextureCube.u_ViewPosition, cameraX, cameraY, cameraZ);
  gl.uniform1i(programTextureCube.u_envCubeMap, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTex);
  gl.uniformMatrix4fv(
    programTextureCube.u_MvpMatrix,
    false,
    mvpMatrix.elements,
  );
  gl.uniformMatrix4fv(
    programTextureCube.u_modelMatrix,
    false,
    modelMatrix.elements,
  );
  gl.uniformMatrix4fv(
    programTextureCube.u_normalMatrix,
    false,
    normalMatrix.elements,
  );

  for (let i = 0; i < obj.length; i++) {
    initAttributeVariable(
      gl,
      programTextureCube.a_Position,
      obj[i].vertexBuffer,
    );
    initAttributeVariable(gl, programTextureCube.a_Normal, obj[i].normalBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, obj[i].numVertices);
  }
}

function drawOneRegularObject(obj, modelMatrix, vpMatrix, index) {
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);

  let mvpMatrix = new Matrix4();
  let normalMatrix = new Matrix4();

  mvpMatrix.set(vpMatrix);
  mvpMatrix.multiply(modelMatrix);

  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();

  gl.uniform3f(program.u_LightPosition, 8, 32, 200);
  gl.uniform3f(program.u_ViewPosition, cameraX, cameraY, cameraZ);
  gl.uniform1f(program.u_Ka, 0.8);
  gl.uniform1f(program.u_Kd, 0.7);
  gl.uniform1f(program.u_Ks, 1.0);
  gl.uniform1f(program.u_shininess, 10.0);

  gl.uniformMatrix4fv(program.u_MvpMatrix, false, mvpMatrix.elements);
  gl.uniformMatrix4fv(program.u_modelMatrix, false, modelMatrix.elements);
  gl.uniformMatrix4fv(program.u_normalMatrix, false, normalMatrix.elements);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[objCompImgIndex[index]]);

  for (let i = 0; i < obj.length; i++) {
    gl.uniform1i(program.u_Sampler0, 0);

    initAttributeVariable(gl, program.a_Position, obj[i].vertexBuffer);
    initAttributeVariable(gl, program.a_TexCoord, obj[i].texCoordBuffer);
    initAttributeVariable(gl, program.a_Normal, obj[i].normalBuffer);

    gl.drawArrays(gl.TRIANGLES, 0, obj[i].numVertices);
  }
}

function drawObjectWithDynamicReflection(obj, modelMatrix, vpMatrix) {
  gl.useProgram(programTextureCube);

  let mvpMatrix = new Matrix4();
  let normalMatrix = new Matrix4();

  mvpMatrix.set(vpMatrix);
  mvpMatrix.multiply(modelMatrix);

  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();

  gl.uniform3f(programTextureCube.u_ViewPosition, cameraX, cameraY, cameraZ);

  gl.uniform1i(programTextureCube.u_envCubeMap, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, fbo.texture);

  gl.uniformMatrix4fv(
    programTextureCube.u_MvpMatrix,
    false,
    mvpMatrix.elements,
  );
  gl.uniformMatrix4fv(
    programTextureCube.u_modelMatrix,
    false,
    modelMatrix.elements,
  );
  gl.uniformMatrix4fv(
    programTextureCube.u_normalMatrix,
    false,
    normalMatrix.elements,
  );

  for (let i = 0; i < obj.length; i++) {
    initAttributeVariable(
      gl,
      programTextureCube.a_Position,
      obj[i].vertexBuffer,
    );
    initAttributeVariable(gl, programTextureCube.a_Normal, obj[i].normalBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, obj[i].numVertices);
  }
}

function draw() {
  renderCubeMap(2, 2, 30);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.4, 0.4, 0.4, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  let rotateMatrix = new Matrix4();

  rotateMatrix.setRotate(angleY, 1, 0, 0);
  rotateMatrix.rotate(angleX, 0, 1, 0);

  var viewDir = new Vector3([cameraDirX, cameraDirY, cameraDirZ]);
  var newViewDir = rotateMatrix.multiplyVector3(viewDir);
  let vpMatrix = new Matrix4();

  vpMatrix.setPerspective(30, 1, 1, 200);

  vpMatrix.lookAt(
    cameraX,
    cameraY,
    cameraZ,
    cameraX + newViewDir.elements[0],
    cameraY + newViewDir.elements[1],
    cameraZ + newViewDir.elements[2],
    0,
    1,
    0,
  );

  var vpFromCamera = new Matrix4();

  vpFromCamera.setPerspective(30, 1, 1, 200);

  var viewMatrixRotationOnly = new Matrix4();

  viewMatrixRotationOnly.lookAt(
    cameraX,
    cameraY,
    cameraZ,
    cameraX + newViewDir.elements[0],
    cameraY + newViewDir.elements[1],
    cameraZ + newViewDir.elements[2],
    0,
    1,
    0,
  );

  viewMatrixRotationOnly.elements[12] = 0;
  viewMatrixRotationOnly.elements[13] = 0;
  viewMatrixRotationOnly.elements[14] = 0;
  vpFromCamera.multiply(viewMatrixRotationOnly);

  var vpFromCameraInverse = vpFromCamera.invert();

  drawRegularObjects(vpMatrix);
  drawEnvMap(vpFromCameraInverse);
  drawOneReflective(cube, vpMatrix);
}

function parseOBJ(text) {
  const objPositions = [[0, 0, 0]];
  const objTexcoords = [[0, 0]];
  const objNormals = [[0, 0, 0]];

  const objVertexData = [objPositions, objTexcoords, objNormals];

  let webglVertexData = [[], [], []];

  const materialLibs = [];
  const geometries = [];
  let geometry;
  let groups = ["default"];
  let material = "default";
  let object = "default";

  const noop = () => {};

  function newGeometry() {
    if (geometry && geometry.data.position.length) {
      geometry = undefined;
    }
  }

  function setGeometry() {
    if (!geometry) {
      const position = [];
      const texcoord = [];
      const normal = [];

      webglVertexData = [position, texcoord, normal];

      geometry = {
        object,
        groups,
        material,
        data: {
          position,
          texcoord,
          normal,
        },
      };

      geometries.push(geometry);
    }
  }

  function addVertex(vert) {
    const ptn = vert.split("/");

    ptn.forEach((objIndexStr, i) => {
      if (!objIndexStr) {
        return;
      }

      const objIndex = parseInt(objIndexStr);
      const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      webglVertexData[i].push(...objVertexData[i][index]);
    });
  }

  const keywords = {
    v(parts) {
      objPositions.push(parts.map(parseFloat));
    },
    vn(parts) {
      objNormals.push(parts.map(parseFloat));
    },
    vt(parts) {
      objTexcoords.push(parts.map(parseFloat));
    },
    f(parts) {
      setGeometry();
      const numTriangles = parts.length - 2;
      for (let tri = 0; tri < numTriangles; ++tri) {
        addVertex(parts[0]);
        addVertex(parts[tri + 1]);
        addVertex(parts[tri + 2]);
      }
    },
    s: noop,
    mtllib(parts, unparsedArgs) {
      materialLibs.push(unparsedArgs);
    },
    usemtl(parts, unparsedArgs) {
      material = unparsedArgs;
      newGeometry();
    },
    g(parts) {
      groups = parts;
      newGeometry();
    },
    o(parts, unparsedArgs) {
      object = unparsedArgs;
      newGeometry();
    },
  };

  const keywordRE = /(\w*)(?: )*(.*)/;
  const lines = text.split("\n");

  for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
    const line = lines[lineNo].trim();

    if (line === "" || line.startsWith("#")) {
      continue;
    }

    const m = keywordRE.exec(line);

    if (!m) {
      continue;
    }

    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];

    if (!handler) {
      console.warn("unhandled keyword:", keyword);
      continue;
    }

    handler(parts, unparsedArgs);
  }

  for (const geometry of geometries) {
    geometry.data = Object.fromEntries(
      Object.entries(geometry.data).filter(([, array]) => array.length > 0),
    );
  }

  return {
    geometries,
    materialLibs,
  };
}

function keydown(ev) {
  let rotateMatrix = new Matrix4();
  rotateMatrix.setRotate(angleY, 1, 0, 0);
  rotateMatrix.rotate(angleX, 0, 1, 0);
  var viewDir = new Vector3([cameraDirX, cameraDirY, cameraDirZ]);
  var newViewDir = rotateMatrix.multiplyVector3(viewDir);

  if (ev.key == "p") {
    if (IsOnePerspective) {
      IsOnePerspective = 0;
      angleX = Three_angleX;
      angleY = Three_angleY;
      cameraX = Three_cameraX;
      cameraY = Three_cameraY;
      cameraZ = Three_cameraZ;
    } else {
      IsOnePerspective = 1;
      angleX = One_angleX;
      angleY = One_angleY;
      cameraX = One_cameraX;
      cameraY = One_cameraY;
      cameraZ = One_cameraZ;
    }
  }
  if (IsOnePerspective == 0) {
    if (ev.key == "w") {
      cameraX += newViewDir.elements[0] * 0.6;
      cameraY += newViewDir.elements[1] * 0.6;
      cameraZ += newViewDir.elements[2] * 0.6;
    } else if (ev.key == "s") {
      cameraX -= newViewDir.elements[0] * 0.6;
      cameraY -= newViewDir.elements[1] * 0.6;
      cameraZ -= newViewDir.elements[2] * 0.6;
    }
  } else {
    if (ev.key == "w") {
      cameraX += newViewDir.elements[0] * 0.3;
      cameraZ += newViewDir.elements[2] * 0.3;
    } else if (ev.key == "s") {
      cameraX -= newViewDir.elements[0] * 0.3;
      cameraZ -= newViewDir.elements[2] * 0.3;
    } else if (ev.key == "a") {
      angleX += 1;
    } else if (ev.key == "d") {
      angleX -= 1;
    }
  }

  update_perspective();

  console.log(cameraX, cameraY, cameraZ);

  draw();
}

function update_perspective() {
  if (IsOnePerspective) {
    One_cameraX = cameraX;
    One_cameraY = cameraY;
    One_cameraZ = cameraZ;
    One_angleX = angleX;
  } else {
    Three_cameraX = cameraX;
    Three_cameraY = cameraY;
    Three_cameraZ = cameraZ;
    Three_angleX = angleX;
    Three_angleY = angleY;
  }
}

function update_status() {
  if (IsOnePerspective) {
    cameraX = One_cameraX;
    cameraY = One_cameraY;
    cameraZ = One_cameraZ;
    angleX = One_angleX;
  } else {
    cameraX = Three_cameraX;
    cameraY = Three_cameraY;
    cameraZ = Three_cameraZ;
    angleX = Three_angleX;
    angleY = Three_angleY;
  }
}

function mouseDown(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
    mouseLastX = x;
    mouseLastY = y;
    mouseDragging = true;
  }
}

function mouseUp(ev) {
  mouseDragging = false;
}

function initCubeTexture(
  posXName,
  negXName,
  posYName,
  negYName,
  posZName,
  negZName,
  imgWidth,
  imgHeight,
) {
  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

  const faceInfos = [
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      fName: posXName,
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      fName: negXName,
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      fName: posYName,
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      fName: negYName,
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      fName: posZName,
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      fName: negZName,
    },
  ];

  faceInfos.forEach((faceInfo) => {
    const { target, fName } = faceInfo;

    gl.texImage2D(
      target,
      0,
      gl.RGBA,
      imgWidth,
      imgHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );

    var image = new Image();

    image.onload = function () {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    };

    image.src = fName;
  });

  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(
    gl.TEXTURE_CUBE_MAP,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR,
  );

  return texture;
}

function mouseMove(ev) {
  var x = ev.clientX;
  var y = ev.clientY;

  if (mouseDragging) {
    var factor = 100 / canvas.height;
    var dx = factor * (x - mouseLastX);
    var dy = factor * (y - mouseLastY);

    angleX += dx;
    angleY += dy;
  }

  mouseLastX = x;
  mouseLastY = y;

  update_perspective();
  draw();
}

function initTexture(gl, img, imgName) {
  var tex = gl.createTexture();

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  textures[imgName] = tex;

  texCount++;

  if (texCount == numTextures) {
    draw();
  }
}

function initFrameBuffer(gl) {
  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    offScreenWidth,
    offScreenHeight,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  var depthBuffer = gl.createRenderbuffer();

  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(
    gl.RENDERBUFFER,
    gl.DEPTH_COMPONENT16,
    offScreenWidth,
    offScreenHeight,
  );

  var frameBuffer = gl.createFramebuffer();

  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  );
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    depthBuffer,
  );

  frameBuffer.texture = texture;

  return frameBuffer;
}

async function loadOBJtoCreateVBO(objFile) {
  let objComponents = [];

  response = await fetch(objFile);
  text = await response.text();
  obj = parseOBJ(text);

  for (let i = 0; i < obj.geometries.length; i++) {
    let o = initVertexBufferForLaterUse(
      gl,
      obj.geometries[i].data.position,
      obj.geometries[i].data.normal,
      obj.geometries[i].data.texcoord,
    );

    objComponents.push(o);
  }

  return objComponents;
}

function initFrameBufferForCubemapRendering(gl) {
  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  for (let i = 0; i < 6; i++) {
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
      0,
      gl.RGBA,
      offScreenWidth,
      offScreenHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
  }

  var depthBuffer = gl.createRenderbuffer();

  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(
    gl.RENDERBUFFER,
    gl.DEPTH_COMPONENT16,
    offScreenWidth,
    offScreenHeight,
  );

  var frameBuffer = gl.createFramebuffer();

  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    depthBuffer,
  );

  frameBuffer.texture = texture;

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return frameBuffer;
}

function renderCubeMap(camX, camY, camZ) {
  var ENV_CUBE_LOOK_DIR = [
    [1.0, 0.0, 0.0],
    [-1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, -1.0, 0.0],
    [0.0, 0.0, 1.0],
    [0.0, 0.0, -1.0],
  ];

  var ENV_CUBE_LOOK_UP = [
    [0.0, -1.0, 0.0],
    [0.0, -1.0, 0.0],
    [0.0, 0.0, 1.0],
    [0.0, 0.0, -1.0],
    [0.0, -1.0, 0.0],
    [0.0, -1.0, 0.0],
  ];

  gl.useProgram(program);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.viewport(0, 0, offScreenWidth, offScreenHeight);
  gl.clearColor(0.4, 0.4, 0.4, 1);

  for (var side = 0; side < 6; side++) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_CUBE_MAP_POSITIVE_X + side,
      fbo.texture,
      0,
    );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let vpMatrix = new Matrix4();

    vpMatrix.setPerspective(90, 1, 1, 100);

    vpMatrix.lookAt(
      camX,
      camY,
      camZ,
      camX + ENV_CUBE_LOOK_DIR[side][0],
      camY + ENV_CUBE_LOOK_DIR[side][1],
      camZ + ENV_CUBE_LOOK_DIR[side][2],
      ENV_CUBE_LOOK_UP[side][0],
      ENV_CUBE_LOOK_UP[side][1],
      ENV_CUBE_LOOK_UP[side][2],
    );

    drawEnvMap(vpMatrix);
    drawRegularObjects(vpMatrix);
    drawOneReflective(cube, vpMatrix);
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function drawEnvMap(vpFromCameraInverse) {
  gl.useProgram(programEnvCube);
  gl.depthFunc(gl.LEQUAL);
  gl.uniformMatrix4fv(
    programEnvCube.u_viewDirectionProjectionInverse,
    false,
    vpFromCameraInverse.elements,
  );
  gl.activeTexture(gl.TEXTURE0);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMapTex);
  gl.uniform1i(programEnvCube.u_envCubeMap, 0);
  initAttributeVariable(gl, programEnvCube.a_Position, quadObj.vertexBuffer);

  gl.drawArrays(gl.TRIANGLES, 0, quadObj.numVertices);
}
