function setup() {
    // Get the canvas element
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Sliders
    var slider1= document.getElementById("slider1");
    slider1.value = 0;
    var slider2 = document.getElementById("slider2");
    slider2.value = 0;
    var slider3 = document.getElementById("slider3");
    slider3.value = 0;

    var time = 0; // Variable
    var vertexSource = document.getElementById("vertexShader").text; // Get the vertex shader source
    var fragmentSource = document.getElementById("fragmentShader").text; // Get the fragment shader source
    var vertexShader = gl.createShader(gl.VERTEX_SHADER); // Create a vertex shader object

    gl.shaderSource(vertexShader, vertexSource); // Attach vertex shader source code
    gl.compileShader(vertexShader); // Compile the vertex shader

    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) { // Check if there was an error during compilation
        alert(gl.getShaderInfoLog(vertexShader)); 
        return null; 
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // Create fragment shader object
    gl.shaderSource(fragmentShader, fragmentSource); // Attach fragment shader source code
    gl.compileShader(fragmentShader); // Compile the fragment shader

    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) { // Check if there was an error during compilation
        alert(gl.getShaderInfoLog(fragmentShader)); 
        return null; 
    }

    var shaderProgram = gl.createProgram(); // Create the shader program
    gl.attachShader(shaderProgram, vertexShader); // Attach a vertex shader
    gl.attachShader(shaderProgram, fragmentShader); // Attach a fragment shader
    gl.linkProgram(shaderProgram); // Link both programs

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // Check if there was an error during linking
        alert("Could not initialize shaders"); 
    }

    // Combine the shader elements into a program
    gl.useProgram(shaderProgram);
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
    shaderProgram.TexCoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram.TexCoordAttribute);
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram, "uMV");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram, "uMVP");
    shaderProgram.MVnormalMatrix = gl.getUniformLocation(shaderProgram, "uMVn");
    shaderProgram.movingLight = gl.getUniformLocation(shaderProgram, "rawLight");
    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "texSampler1");
    gl.uniform1i(shaderProgram.texSampler1, 0);
    shaderProgram.texSampler2 = gl.getUniformLocation(shaderProgram, "texSampler2");
    gl.uniform1i(shaderProgram.texSampler2, 1);

    var vertexPos = new Float32Array([ // Vertex positions
        0, 1.400, 0, -1, 0, -1, 1, 0, -1,
        0, 1.400, 0, 1, 0, -1, 1, 0, 1,
        0, 1.400, 0, 1, 0, 1, -1, 0, 1,
        0, 1.400, 0, -1, 0, 1, -1, 0, -1,
        -1, 0, -1, 1, 0, -1, 1, 0, 1,
        1, 0, 1, -1, 0, 1, -1, 0, -1  
    ]);

    var vertexColors = new Float32Array([ // Vertex colors
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1,
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1,
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1,
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1,
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1,
        1, 0.6, 0.1, 1, 0.6, 0.1, 1, 0.6, 0.1
    ]);

    var vertexNormals = new Float32Array([ // Vertex normals
        0, 1, 1.400, -1, 1, 1, 1, 1, 1,
        1.400, 1, 0, 1, 1, 1, 1, 1, -1,
        0, 1, -1.400, 1, 1, -1, -1, 1, -1,
        -1.400, 1,0, -1, 1, -1, -1, 1, 1,
        -1, -1, 1, 1, -1, 1, 1, -1, -1,
        1, -1, -1, -1, -1, -1, -1, -1, 1
    ]);

    var vertexTextureCoords = new Float32Array([ // Vertex texture coordinates
        0.5, 0, 1, 1, 0, 1,
        0.5, 0, 1, 1, 0, 1,
        0.5, 0, 1, 1, 0, 1,
        0.5, 0, 1, 1, 0, 1,
        0, 0, 1, 0, 1, 1,
        1, 1, 0, 1, 0, 0 
    ]);

    var triangleIndices = new Uint8Array([ // Triangle indices
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11,
        12, 13, 14,
        15, 16, 17
    ]);

    // Create the vertex buffer objects
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 18;
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = 18;
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 18;
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = 18;
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);

    // Texture
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    var image = new Image(); // Create a new image object

    function initTextureThenDraw() { // Load the texture image
        image.onload = function() { // When the image has loaded
            loadTexture(image, texture); 
        };

        image.crossOrigin = "anonymous";
        image.src = 'sand.jpg';

        window.setTimeout(draw, 200);
    }

    function loadTexture(image, texture) { // Load the texture
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    function change() {
        //do nothing
    }

    function draw() { // Draw the scene
        time = time + .1; // Update the time
        time = time + slider3.value * 0.01; // Use slider to change the time

        window.requestAnimationFrame(draw); // Request the next frame

        // Variable initializations
        var angleCamera = time * 0.01 * Math.PI;
        var lightDir = slider1.value * 0.01 * Math.PI;
        var angleRotate = slider2.value * 0.01 * Math.PI;
        var eye = [400 * Math.sin(angleCamera), 200.0, 400 * Math.cos(angleCamera)];
        var target = [0, 0, 0];
        var up = [0, 1, 0];

        // Create the view matrix
        var tModel = mat4.create();
        mat4.fromRotation(tModel, angleRotate, [1, 1, 1]);
        mat4.scale(tModel, tModel, [100, 100, 100]);
        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);
        var tProjection = mat4.create();
        mat4.perspective(tProjection, Math.PI / 4, 1, 10, 1000);
        var tMVP = mat4.create();
        var tMV = mat4.create();
        mat4.multiply(tMV, tCamera, tModel);
        var tMVn = mat3.create();
        mat3.normalFromMat4(tMVn, tMV);
        mat4.multiply(tMVP, tProjection, tMV);
        var light = [Math.sin(lightDir), 1.5, Math.cos(lightDir)];

        // Clear the canvas
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set the shader program
        gl.uniformMatrix4fv(shaderProgram.MVmatrix, false, tMV);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix, false, tMVP);
        gl.uniformMatrix3fv(shaderProgram.MVnormalMatrix, false, tMVn);
        gl.uniform3fv(shaderProgram.movingLight, light);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.TexCoordAttribute, textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);
    }

    // Call sliders
    slider1.addEventListener("input", change);
    slider2.addEventListener("input", change);

    // Function calls
    draw();
    initTextureThenDraw();
}

window.onload = setup;
