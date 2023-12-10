// Name: Jacob Desilets and Jacob DeRosa

let gl;
let numVertices;
let numTriangles;

let projectionFlag = -1; // -1 for persp, 1 for orth
let light1Flag = 1; // -1 for off, 1 for on
let light2Flag = 1; // -1 for off, 1 for on

// Globals
let modelviewLocation, projectionLocation;
let myShaderProgram;
let P_persp, P_orth;

function initGL() {
    let canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, 512, 512);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(myShaderProgram);


    // The following block of code together with the 
    // definitions in object.js are provided for diagnosis
    // 
    // For full credit, REPLACE THE FOLLOWING BLOCK with
    // a block that loads the vertices and faces from the provided ply file
    // You are encouraged to explore THREE.js by using ChatGPT
    // to investigate how to load a PLY file and get
    // access to the vertices and faces
    //
    vertices = getVertices(); // currently defined in object.js
    indexList = getFaces();
    numVertices = vertices.length;
    numTriangles = indexList.length / 3;
    // End of block on reading vertices and faces that you should replace

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);

    let verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    let vertexPosition = gl.getAttribLocation(myShaderProgram, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    // Insert your code here

    // =======================================================
    // Step 1: Position the camera using the look at method
    // =======================================================

    // Define eye (use vec3 in MV.js)

    let e = vec3(6.0, 12.0, -16.0);

    // Define at point (use vec3 in MV.js)

    let a = vec3(0.0, 0.0, 0.0);

    // Define vup vector (use vec3 in MV.js)

    let vup = vec3(0.0, 1.0, 0.0);

    // Obtain n (use subtract and normalize in MV.js)

    let d = subtract(e, a);
    let n = normalize(d);

    // Obtain u (use cross and normalize in MV.js)

    let k = cross(vup, n);
    let u = normalize(k);

    // Obtain v (use cross and normalize in MV.js)

    let l = cross(n, u);
    let v = normalize(l);

    // Set up Model-View matrix M and send M as uniform to shader
    let M = [u[0],
    v[0],
    n[0],
        0.0,
    u[1],
    v[1],
    n[1],
        0.0,
    u[2],
    v[2],
    n[2],
        0.0,
    -dot(e, u),
    -dot(e, v),
    -dot(e, n),
        1.0];

    // =======================================================
    // Step 2: Set up orthographic and perspective projections
    // =======================================================

    // Define left plane
    let left = -2.5;

    // Define right plane
    let right = 2.5;

    // Define top plane
    let top_ = 2.5;

    // Define bottom plane
    let bottom = -2.5;

    // Define near plane
    let near = 20.0 - 2.5;

    // Define far plane
    let far = 20.0 + 2.5;

    // Set up orthographic projection matrix P_orth using above planes
    P_orth = [
        2.0 / (right - left),
        0.0,
        0.0,
        0.0,
        0.0,
        2.0 / (top_ - bottom),
        0.0,
        0.0,
        0.0,
        0.0,
        -2.0 / (far - near),
        0.0,
        -(left + right) / (right - left),
        -(top_ + bottom) / (top_ - bottom),
        -(far + near) / (far - near),
        1.0
    ];

    // Set up perspective projection matrix P_persp using above planes

    P_persp = [
        2.0 * near / (right - left),
        0.0,
        0.0,
        0.0,
        0.0,
        2.0 * near / (top_ - bottom),
        0.0,
        0.0,
        (right + left) / (right - left),
        (top_ + bottom) / (top_ - bottom),
        -(far + near) / (far - near),
        -1.0,
        0.0,
        0.0,
        -2.0 * far * near / (far - near),
        0.0
    ];

    modelviewLocation = gl.getUniformLocation(myShaderProgram, "modelview");
    projectionLocation = gl.getUniformLocation(myShaderProgram, "projection");

    gl.uniformMatrix4fv(modelviewLocation, false, M);

    // Send orth or persp based on flag value
    sendProjectionUniform();

    // =======================================================
    // Step 3: Lighting
    // =======================================================

    // Normals for lighting calculations

    // Create face normals using faces and vertices by calling getFaceNormals
    let faceNormals = getFaceNormals(vertices, indexList, numTriangles);

    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    let vertexNormals = getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles);

    // Following code sets up the normals buffer
    let normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    let vertexNormal = gl.getAttribLocation(myShaderProgram, "vertexNormal");
    gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexNormal);

    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program
    let ka = vec3(.9, .9, .9);
    let kd = vec3(.9, .9, .9);
    let ks = vec3(1.0, 1.0, 1.0);
    let shininess = 5.0;

    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "ka"), ka[0], ka[1], ka[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "kd"), kd[0], kd[1], kd[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "ks"), ks[0], ks[1], ks[2]);

    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "shininess"), shininess);

    // Set up light 1: directional light

    sendLight1Uniforms();

    // Set up light 2: point light

    sendLight2Uniforms();

    // modelview inverse transpose

    let MIT = [
        u[0],
        v[0],
        n[0],
        e[0],
        u[1],
        v[1],
        n[1],
        e[1],
        u[2],
        v[2],
        n[2],
        e[2],
        0.0,
        0.0,
        0.0,
        1.0
    ];

    let modelViewITLocation = gl.getUniformLocation(myShaderProgram, "modelviewIT");
    gl.uniformMatrix4fv(modelViewITLocation, false, MIT);

    // Finally, draw
    drawObject();
};


function drawObject() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0)
};


function toggleProjection() {
    projectionFlag *= -1;
    sendProjectionUniform();
    drawObject();
};

function toggleLight1() {
    light1Flag *= -1;
    sendLight1Uniforms();
    drawObject();
};

function toggleLight2() {
    light2Flag *= -1;
    sendLight2Uniforms();
    drawObject();
};

function sendLight1Uniforms() {
    let l1_dir, l1_Ia, l1_Id, l1_Is;

    if(light1Flag === 1) {
        l1_dir = vec3(0.9, 0.9, 0.2);
        l1_Ia = vec3(0.0, 0.0, 0.0);
        l1_Id = vec3(0.5, 0.1, 0.1);
        l1_Is = vec3(0.5, 0.1, 0.1);
    } else {
        l1_dir = vec3(0.0, 0.0, 0.0);
        l1_Ia = vec3(0.0, 0.0, 0.0);
        l1_Id = vec3(0.0, 0.0, 0.0);
        l1_Is = vec3(0.0, 0.0, 0.0);
    }
    
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l1_Ia"), l1_Ia[0], l1_Ia[1], l1_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l1_Id"), l1_Id[0], l1_Id[1], l1_Id[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l1_Is"), l1_Is[0], l1_Is[1], l1_Is[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l1_dir"), l1_dir[0], l1_dir[1], l1_dir[2]);
}

function sendLight2Uniforms() {
    let l2_p0, l2_Ia, l2_Id, l2_Is;

    if(light2Flag === 1) {
        l2_p0 = vec3(0.0, 0.0, 0.0);
        l2_Ia = vec3(0.1, 0.1, 0.1);
        l2_Id = vec3(0.1, 0.1, 0.1);
        l2_Is = vec3(0.1, 0.1, 0.1);
    } else {
        l2_p0 = vec3(0.0, 0.0, 0.0);
        l2_Ia = vec3(0.0, 0.0, 0.0);
        l2_Id = vec3(0.0, 0.0, 0.0);
        l2_Is = vec3(0.0, 0.0, 0.0);
    }
    

    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l2_Ia"), l2_Ia[0], l2_Ia[1], l2_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l2_Id"), l2_Id[0], l2_Id[1], l2_Id[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l2_Is"), l2_Is[0], l2_Is[1], l2_Is[2]);
    gl.uniform3f(gl.getUniformLocation(myShaderProgram, "l2_p0"), l2_p0[0], l2_p0[1], l2_p0[2]);
}

function sendProjectionUniform() {
    projectionFlag === -1 ? gl.uniformMatrix4fv(projectionLocation, false, P_persp) : gl.uniformMatrix4fv(projectionLocation, false, P_orth);
};


function getFaceNormals(vertices, indexList, numTriangles) {
    let faceNormals = [];
    for (let i = 0; i < numTriangles; i++) {
        let p0 = vertices[indexList[3 * i]];
        let p1 = vertices[indexList[3 * i + 1]];
        let p2 = vertices[indexList[3 * i + 2]];

        let v1 = vec3(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2])
        let v2 = vec3(p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2])

        let n = cross(v1, v2);
        n = normalize(n);
        faceNormals.push(n);
    }

    // Following line returns the array of face normals
    return faceNormals;
}


function getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles) {
    let vertexNormals = [];
    for (let j = 0; j < numVertices; j++) {
        let vertexNormal = vec3(.0, .0, .0);
        for (let i = 0; i < numTriangles; i++) {
            if (j == indexList[3 * i] || j == indexList[3 * i + 1] || j == indexList[3 * i + 2]) {
                vertexNormal[0] += faceNormals[i][0];
                vertexNormal[1] += faceNormals[i][1];
                vertexNormal[2] += faceNormals[i][2];
            }
        }

        if (length(vertexNormal) > 1e-6) {
            vertexNormal = normalize(vertexNormal);
        }
        vertexNormals.push(vertexNormal);
    }

    // Following line returns the array of vertex normals
    return vertexNormals;
}