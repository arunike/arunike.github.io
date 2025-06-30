function setup() {
  // Global variables
  window.mat4 = glMatrix.mat4;
  window.vec3 = glMatrix.vec3;

  // Create a shader object from source
  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!success) {
      // If creating the shader failed, alert
      throw "could not compile shader:" + source + gl.getShaderInfoLog(shader);
    }

    return shader;
  }

  // Create a program object and attach the two compiled shaders
  function createProgram(gl, vertex, fragment) {
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!success) {
      // If creating the shader program failed, alert
      throw "program failed to link:" + gl.getProgramInfoLog(program);
    }

    return program;
  }

  // Create a program from strings instead of shaders
  function createProgramFromString(gl, vertex, fragment) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);
    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program); // Tell WebGL to use this program when drawing
    gl.deleteShader(vertexShader); // Delete the shaders since the program has been made
    gl.deleteShader(fragmentShader); // Delete the shaders since the program has been made

    return program;
  }

  // Create a buffer and set the attribute pointer
  function createBufferInfo(gl, program, attr, data) {
    const attrL = gl.getAttribLocation(program, attr);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // Bind the buffer
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); // Put the data in the buffer

    return { buffer, attr: attrL };
  }

  // Get the uniform location and set the data
  function getAndSetUniform(gl, program, attr, data) {
    const a = gl.getUniformLocation(program, attr);

    if (!data.length) {
      // If the data is a number
      gl.uniform1f(a, data);
    } else if (data.length === 3) {
      // If the data is a vector
      gl.uniform3fv(a, new Float32Array(data));
    } else if (data.length === 4) {
      // If the data is a vector
      gl.uniform4fv(a, new Float32Array(data));
    } else {
      // If the data is a matrix
      gl.uniformMatrix4fv(a, false, data);
    }

    return a;
  }

  // Create a canvas and get the WebGL context
  function createGl() {
    // Create a canvas and add it to the document
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl");

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); // Set the viewport to the canvas size

    return gl;
  }

  // Create a new matrix
  function newMatrix() {
    return mat4.create();
  }

  // Convert degrees to radians
  function radian(degree) {
    return (Math.PI * degree) / 180;
  }

  // Create a super shape with the given number of meridians and parallels
  function createSuperShape(meridians = 70, parallels = 70) {
    const vertices = [],
      points = []; // The vertices and points of the shape

    // The super shape function to create the shape
    function superShape(theta, m, n1, n2, n3, a = 1, b = 1) {
      return (
        (Math.abs((1 / a) * Math.cos((m * theta) / 4)) ** n2 +
          Math.abs((1 / b) * Math.sin((m * theta) / 4)) ** n3) **
        (-1 / n1)
      );
    }

    let lat, lon, x, y, z, r1, r2; // Variables

    for (let i = 0; i <= parallels; ++i) {
      // Create the vertices
      lat = (i * Math.PI) / parallels - Math.PI / 2;
      r2 = superShape(lat, 10, 3, 0.2, 1);

      for (let j = 0; j <= meridians; ++j) {
        // Create the vertices
        lon = (j * 2 * Math.PI) / meridians - Math.PI;
        r1 = superShape(lon, 5.7, 0.5, 1, 2.5);

        x = r1 * Math.cos(lon) * r2 * Math.cos(lat);
        y = r1 * Math.sin(lon) * r2 * Math.cos(lat);
        z = r2 * Math.sin(lat);

        vertices.push([x, y, z]);
      }
    }

    // Create a triangle from three vertices
    function triangle(a, b, c) {
      points.push(...vertices[a], ...vertices[b], ...vertices[c]);
    }

    // Create a quadrilateral from two triangles
    function quadrilateral(a, b, c, d) {
      triangle(a, d, c);
      triangle(a, b, d);
    }

    // Variables for the loops
    const row = parallels + 1;
    let p1, p2;

    for (let i = 0; i < parallels; ++i) {
      // Create the triangles and quadrilaterals based on parallels
      for (let j = 0; j < meridians; ++j) {
        // Create the triangles and quadrilaterals based on meridians
        p1 = i * row + j;
        p2 = p1 + row;

        quadrilateral(p1, p1 + 1, p2, p2 + 1);
      }
    }

    return new Float32Array(points);
  }

  const gl = createGl(); // Create the WebGL context

  // Create the program from the vertex and fragment shader
  const program = createProgramFromString(
    gl,
    ` 
    attribute vec4 aPos;
    attribute vec3 aNormal;

    uniform mat4 modelMat;
    uniform mat4 viewMat;
    uniform mat4 projMat;
    uniform mat4 normalMat;

    varying vec4 vPos;
    varying vec3 vNormal;

    void main() {
      vPos = modelMat * aPos;
      vNormal = mat3(normalMat) * aNormal;
      gl_Position = projMat * viewMat * vPos;
    }
  `,
    `
    precision mediump float;

    struct Material {
      vec3 ambient;
      vec3 diffuse;
      vec3 specular;
      float shininess;
    };

    struct Light {
      vec4 position;
      vec3 direction;
      vec3 ambient;
      vec3 diffuse;
      vec3 specular;

      float cutOff;
      float outerCutOff;
      float constant;
      float linear;
      float quadratic;
    };

    varying vec4 vPos;
    varying vec3 vNormal;

    uniform vec3 camera;
    uniform Light light;
    uniform Material material;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 pos = vPos.xyz;

      vec4 lightPos = light.position;

      vec3 ambient = light.ambient * material.ambient;

      vec3 surfaceToLight = normalize(lightPos.xyz - pos);
      
      float theta = dot(normalize(light.direction), surfaceToLight);
      float intensity = smoothstep(light.outerCutOff, light.cutOff, theta);

      vec3 lightDir = normalize(lightPos.w > 0. ? lightPos.xyz - pos : lightPos.xyz);
      vec3 diffuse = max(dot(normal, lightDir), 0.) * light.diffuse * material.diffuse;

      vec3 h = normalize(lightDir + normalize(camera - pos));
      vec3 specular = pow(max(dot(normal, h), 0.), material.shininess) * light.specular * material.specular;

      diffuse *= intensity;    
      specular *= intensity;

      float distance = length(lightPos.xyz - pos);
      float attenuation = 1. / (light.constant + light.linear * distance + light.quadratic * (distance * distance)); 

      gl_FragColor = vec4((ambient + diffuse + specular) * attenuation, 1.);
    }
  `,
  );

  const sphere = createSuperShape(); // Create the super shape
  const count = sphere.length / 3; // The number of vertices

  const viewMat = mat4.lookAt(newMatrix(), [0, 0, 10], [0, 0, 0], [0, 1, 0]); // The view matrix
  const projMat = mat4.perspective(
    newMatrix(),
    radian(13),
    gl.canvas.clientWidth / gl.canvas.clientHeight,
    1,
    2000,
  ); // The projection matrix
  const baseModelMat = mat4.fromXRotation(newMatrix(), radian(35)); // The base model matrix

  // Create the buffers for light and viewing angle
  getAndSetUniform(gl, program, "camera", [0, 0, 10]);
  getAndSetUniform(gl, program, "light.position", [0, 0, 10, 1]);
  getAndSetUniform(gl, program, "light.direction", [0, 0, 10]);
  getAndSetUniform(gl, program, "light.ambient", [0.3, 0.3, 0.3]);
  getAndSetUniform(gl, program, "light.diffuse", [1, 1, 1]);
  getAndSetUniform(gl, program, "light.specular", [1, 1, 1]);
  getAndSetUniform(gl, program, "light.cutOff", Math.cos(radian(2)));
  getAndSetUniform(gl, program, "light.outerCutOff", Math.cos(radian(2.1)));

  // Create the buffers for light and shapes
  getAndSetUniform(gl, program, "light.constant", 1);
  getAndSetUniform(gl, program, "light.linear", 0.007);
  getAndSetUniform(gl, program, "light.quadratic", 0.0002);

  // Create the buffers for light and material
  getAndSetUniform(gl, program, "material.ambient", [0.04, 0.68, 0.26]);
  getAndSetUniform(gl, program, "material.diffuse", [0.04, 0.68, 0.26]);
  getAndSetUniform(gl, program, "material.specular", [1, 1, 1]);
  getAndSetUniform(gl, program, "material.shininess", 60);

  // Create the buffers for view and projection
  getAndSetUniform(gl, program, "viewMat", viewMat);
  getAndSetUniform(gl, program, "projMat", projMat);

  const uModelMat = gl.getUniformLocation(program, "modelMat"); // The model matrix
  const uNormalMat = gl.getUniformLocation(program, "normalMat"); // The normal matrix

  const posInfo = createBufferInfo(gl, program, "aPos", sphere); // The position buffer
  const normalInfo = createBufferInfo(gl, program, "aNormal", sphere); // The normal buffer

  // Set the attributes for the position and normal buffers
  gl.enableVertexAttribArray(posInfo.attr);
  gl.vertexAttribPointer(posInfo.attr, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normalInfo.attr);
  gl.vertexAttribPointer(normalInfo.attr, 3, gl.FLOAT, false, 0, 0);

  // Set the clear color and enable depth testing
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.clearColor(1, 1, 1, 1);

  let rotate = 1,
    modelMat,
    normalMat; // The rotation and matrices

  // The draw function to draw the scene
  function draw() {
    // Create the model and normal matrices
    modelMat = mat4.rotateY(newMatrix(), baseModelMat, rotate);
    normalMat = mat4.transpose(newMatrix(), mat4.invert([], modelMat));

    // Set the model and normal matrices
    gl.uniformMatrix4fv(uModelMat, false, modelMat);
    gl.uniformMatrix4fv(uNormalMat, false, normalMat);

    // Clear the canvas and draw the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, count);

    rotate += 0.01; // Increment the rotation

    requestAnimationFrame(draw); // Request the next frame
  }

  draw(); // Draw the scene
}

window.onload = setup; // Setup the scene
