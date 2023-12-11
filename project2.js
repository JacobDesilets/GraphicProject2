// Name: Jacob Desilets and Jacob DeRosa

let gl;
let numVertices;
let numTriangles;

let projectionFlag = -1; // -1 for persp, 1 for orth
let light1Flag = 1; // -1 for off, 1 for on
let light2Flag = 1; // -1 for off, 1 for on

let modelviewLocation1, projectionLocation1, modelviewLocation2, projectionLocation2, modelviewLocation3, projectionLocation3;

let P_persp, P_orth;

let obj1Ibuffer;
let obj1Vbuffer;
let obj1Nbuffer;
let obj1Program;
let obj1Vpointer;
let obj1VertexNormal;

let obj2Ibuffer;
let obj2Vbuffer;
let obj2Nbuffer;
let obj2Program;
let obj2Vpointer;
let obj2VertexNormal;

let obj3Ibuffer;
let obj3Vbuffer;
let obj3Nbuffer;
let obj3Program;
let obj3Vpointer;
let obj3VertexNormal;

let woodTextureUrl = "https://media.istockphoto.com/id/484096068/photo/wooden-texture-background.webp?b=1&s=170667a&w=0&k=20&c=RWLEm-1NkqPzEgrX0zRid7WHtclBQBmI4RQZlouc02g=";
let woodTextureImage;

let giftTextureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMkikB0yqsbphfbJ6vccDDYYONa1j5vqYPw&usqp=CAU";
let giftTextureImage;

function initGL() {
    let canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, 512, 512);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Object 1
    obj1Program = initShaders(gl, "vert1", "frag1");
    gl.useProgram(obj1Program);

    obj1Ibuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj1Ibuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj1.indexList), gl.STATIC_DRAW);

    obj1Vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj1Vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj1.vertices), gl.STATIC_DRAW);

    obj1Vpointer = gl.getAttribLocation(obj1Program, "vertexPosition");
    gl.vertexAttribPointer(obj1Vpointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj1Vpointer);

    // Object 2
    obj2Program = initShaders(gl, "vert1", "frag1");
    gl.useProgram(obj2Program);

    obj2Ibuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj2Ibuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj2.indexList), gl.STATIC_DRAW);

    obj2Vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj2Vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj2.vertices), gl.STATIC_DRAW);

    obj2Vpointer = gl.getAttribLocation(obj2Program, "vertexPosition");
    gl.vertexAttribPointer(obj2Vpointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj2Vpointer);

    // Object 3
    obj3Program = initShaders(gl, "vert2", "frag2");
    gl.useProgram(obj3Program);

    obj3Ibuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj3Ibuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj3.indexList), gl.STATIC_DRAW);

    obj3Vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj3Vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj3.vertices), gl.STATIC_DRAW);

    obj3Vpointer = gl.getAttribLocation(obj3Program, "vertexPosition");
    gl.vertexAttribPointer(obj3Vpointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj3Vpointer);

    // =======================================================
    // Step 1: Position the camera using the look at method
    // =======================================================

    // Define eye (use vec3 in MV.js)

    let e = vec3(6.0, 5.0, -16.0);

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

    let margin = 2.0;

    // Define left plane
    let left = -margin;

    // Define right plane
    let right = margin;

    // Define top plane
    let top_ = margin;

    // Define bottom plane
    let bottom = -margin;

    // Define near plane
    let near = 15.0 - margin;

    // Define far plane
    let far = 20.0 + margin;

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

    // Object 1
    gl.useProgram(obj1Program);

    modelviewLocation1 = gl.getUniformLocation(obj1Program, "modelview");
    projectionLocation1 = gl.getUniformLocation(obj1Program, "projection");

    gl.uniformMatrix4fv(modelviewLocation1, false, M);

    // Object 2
    gl.useProgram(obj2Program);

    modelviewLocation2 = gl.getUniformLocation(obj2Program, "modelview");
    projectionLocation2 = gl.getUniformLocation(obj2Program, "projection");

    gl.uniformMatrix4fv(modelviewLocation2, false, M);

    // Object 3
    gl.useProgram(obj3Program);

    modelviewLocation3 = gl.getUniformLocation(obj3Program, "modelview");
    projectionLocation3 = gl.getUniformLocation(obj3Program, "projection");

    gl.uniformMatrix4fv(modelviewLocation3, false, M);

    // Send orth or persp based on flag value
    sendProjectionUniform();

    // =======================================================
    // Step 3: Lighting
    // =======================================================

    // Object 1
    gl.useProgram(obj1Program);

    // Normals for lighting calculations

    // Create face normals using faces and vertices by calling getFaceNormals
    let obj1FaceNormals = getFaceNormals(obj1.vertices, obj1.indexList, obj1.indexList.length / 3);

    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    let obj1VertexNormals = getVertexNormals(obj1.vertices, obj1.indexList, obj1FaceNormals, obj1.vertices.length, obj1.indexList.length / 3);

    // Following code sets up the normals buffer
    obj1Nbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj1Nbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj1VertexNormals), gl.STATIC_DRAW);

    obj1VertexNormal = gl.getAttribLocation(obj1Program, "vertexNormal");
    gl.vertexAttribPointer(obj1VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj1VertexNormal);

    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program
    let obj1_ka = vec3(.9, .9, .9);
    let obj1_kd = vec3(.9, .9, .9);
    let obj1_ks = vec3(1.0, 1.0, 1.0);
    let obj1_shininess = 0.1;

    gl.uniform3f(gl.getUniformLocation(obj1Program, "ka"), obj1_ka[0], obj1_ka[1], obj1_ka[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "kd"), obj1_kd[0], obj1_kd[1], obj1_kd[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "ks"), obj1_ks[0], obj1_ks[1], obj1_ks[2]);

    gl.uniform1f(gl.getUniformLocation(obj1Program, "shininess"), obj1_shininess);

    // Object 2
    gl.useProgram(obj2Program);

    // Normals for lighting calculations

    // Create face normals using faces and vertices by calling getFaceNormals
    let obj2FaceNormals = getFaceNormals(obj2.vertices, obj2.indexList, obj2.indexList.length / 3);

    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    let obj2VertexNormals = getVertexNormals(obj2.vertices, obj2.indexList, obj2FaceNormals, obj2.vertices.length, obj2.indexList.length / 3);

    // Following code sets up the normals buffer
    obj2Nbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj2Nbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj2VertexNormals), gl.STATIC_DRAW);

    obj2VertexNormal = gl.getAttribLocation(obj2Program, "vertexNormal");
    gl.vertexAttribPointer(obj2VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj2VertexNormal);

    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program
    let obj2_ka = vec3(.9, .9, .9);
    let obj2_kd = vec3(.9, .9, .9);
    let obj2_ks = vec3(1.0, 1.0, 1.0);
    let obj2_shininess = 1.0;

    gl.uniform3f(gl.getUniformLocation(obj2Program, "ka"), obj2_ka[0], obj2_ka[1], obj2_ka[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "kd"), obj2_kd[0], obj2_kd[1], obj2_kd[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "ks"), obj2_ks[0], obj2_ks[1], obj2_ks[2]);

    gl.uniform1f(gl.getUniformLocation(obj2Program, "shininess"), obj2_shininess);

    // Object 3
    gl.useProgram(obj3Program);

    // Normals for lighting calculations

    // Create face normals using faces and vertices by calling getFaceNormals
    let obj3FaceNormals = getFaceNormals(obj3.vertices, obj3.indexList, obj3.indexList.length / 3);

    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    let obj3VertexNormals = getVertexNormals(obj3.vertices, obj3.indexList, obj3FaceNormals, obj3.vertices.length, obj3.indexList.length / 3);

    // Following code sets up the normals buffer
    obj3Nbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj3Nbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj3VertexNormals), gl.STATIC_DRAW);

    obj3VertexNormal = gl.getAttribLocation(obj3Program, "vertexNormal");
    gl.vertexAttribPointer(obj3VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj3VertexNormal);

    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program
    let obj3_ka = vec3(.9, .9, .9);
    let obj3_kd = vec3(.9, .9, .9);
    let obj3_ks = vec3(.1, .1, .1);
    let obj3_shininess = 0.9;

    gl.uniform3f(gl.getUniformLocation(obj3Program, "ka"), obj3_ka[0], obj3_ka[1], obj3_ka[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "kd"), obj3_kd[0], obj3_kd[1], obj3_kd[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "ks"), obj3_ks[0], obj3_ks[1], obj3_ks[2]);

    gl.uniform1f(gl.getUniformLocation(obj3Program, "shininess"), obj3_shininess);

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

    // Object 1
    gl.useProgram(obj1Program);
    let modelViewITLocation1 = gl.getUniformLocation(obj1Program, "modelviewIT");
    gl.uniformMatrix4fv(modelViewITLocation1, false, MIT);

    // Object 2
    gl.useProgram(obj2Program);
    let modelViewITLocation2 = gl.getUniformLocation(obj2Program, "modelviewIT");
    gl.uniformMatrix4fv(modelViewITLocation2, false, MIT);

    // Object 3
    gl.useProgram(obj3Program);
    let modelViewITLocation3 = gl.getUniformLocation(obj3Program, "modelviewIT");
    gl.uniformMatrix4fv(modelViewITLocation3, false, MIT);

    // =======================================================
    // Step 4: Texturing
    // =======================================================

    // Object 1 texturing
    gl.useProgram(obj1Program);

    woodTextureImage = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, woodTextureImage);
    const image1 = new Image();
    var url = woodTextureUrl;
    image1.crossOrigin = "anonymous";
    image1.onload = function() {
        gl.bindTexture( gl.TEXTURE_2D, woodTextureImage );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image1 );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.generateMipmap( gl.TEXTURE_2D ); // only use this if the image is a power of 2
        return woodTextureImage;
    };
    image1.src = url;

    var textureVertexbuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,textureVertexbuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj1.texCoords), gl.STATIC_DRAW);
    
    var textureCoordinate1 = gl.getAttribLocation(obj1Program,"textureCoordinate");
    gl.vertexAttribPointer(textureCoordinate1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureCoordinate1);

    // Object 2 texturing
    gl.useProgram(obj2Program);

    giftTextureImage = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, giftTextureImage);
    const image2 = new Image();
    url = giftTextureUrl;
    image2.crossOrigin = "anonymous";
    image2.onload = function() {
        gl.bindTexture( gl.TEXTURE_2D, giftTextureImage );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image2 );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.generateMipmap( gl.TEXTURE_2D ); // only use this if the image is a power of 2
        return giftTextureImage;
    };
    image2.src = url;

    var textureVertexbuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,textureVertexbuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj2.texCoords), gl.STATIC_DRAW);
    
    var textureCoordinate2 = gl.getAttribLocation(obj2Program,"textureCoordinate");
    gl.vertexAttribPointer(textureCoordinate2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureCoordinate2);

    // Finally, draw
    drawObjects();
};


function drawObjects() {
    

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawObj1();
    drawObj2();
    drawObj3();
    
    requestAnimFrame(drawObjects);
};

function drawObj1() {
    gl.useProgram(obj1Program);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj1Vbuffer);
    gl.enableVertexAttribArray(obj1Vpointer);
    gl.vertexAttribPointer(obj1Vpointer, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj1Nbuffer);
    gl.vertexAttribPointer(obj1VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj1VertexNormal);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, woodTextureImage);
    gl.uniform1i(gl.getUniformLocation(obj1Program, "texMap0"), 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj1Ibuffer);

    gl.drawElements(gl.TRIANGLES, 3 * (obj1.indexList.length / 3), gl.UNSIGNED_SHORT, 0)
}

function drawObj2() {
    gl.useProgram(obj2Program);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj2Vbuffer);
    gl.enableVertexAttribArray(obj2Vpointer);
    gl.vertexAttribPointer(obj2Vpointer, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj2Nbuffer);
    gl.vertexAttribPointer(obj2VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj2VertexNormal);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, giftTextureImage);
    gl.uniform1i(gl.getUniformLocation(obj2Program, "texMap0"), 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj2Ibuffer);

    gl.drawElements(gl.TRIANGLES, 3 * (obj2.indexList.length / 3), gl.UNSIGNED_SHORT, 0)
}

function drawObj3() {
    gl.useProgram(obj3Program);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj3Vbuffer);
    gl.enableVertexAttribArray(obj3Vpointer);
    gl.vertexAttribPointer(obj3Vpointer, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj3Nbuffer);
    gl.vertexAttribPointer(obj3VertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj3VertexNormal);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj3Ibuffer);

    gl.drawElements(gl.TRIANGLES, 3 * (obj3.indexList.length / 3), gl.UNSIGNED_SHORT, 0)
}


function toggleProjection() {
    projectionFlag *= -1;
    sendProjectionUniform();
    drawObjects();
};

function toggleLight1() {
    light1Flag *= -1;
    sendLight1Uniforms();
    drawObjects();
};

function toggleLight2() {
    light2Flag *= -1;
    sendLight2Uniforms();
    drawObjects();
};

function sendLight1Uniforms() {
    let l1_dir, l1_Ia, l1_Id, l1_Is;

    if(light1Flag === 1) {
        l1_dir = vec3(0.1, 0.1, 0.1);
        l1_Ia = vec3(0.1, 0.1, 0.1);
        l1_Id = vec3(0.5, 0.1, 0.1);
        l1_Is = vec3(0.5, 0.1, 0.1);
    } else {
        l1_dir = vec3(0.0, 0.0, 0.0);
        l1_Ia = vec3(0.0, 0.0, 0.0);
        l1_Id = vec3(0.0, 0.0, 0.0);
        l1_Is = vec3(0.0, 0.0, 0.0);
    }
    
    gl.useProgram(obj1Program);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l1_Ia"), l1_Ia[0], l1_Ia[1], l1_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l1_Id"), l1_Id[0], l1_Id[1], l1_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l1_Is"), l1_Is[0], l1_Is[1], l1_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l1_dir"), l1_dir[0], l1_dir[1], l1_dir[2]);

    gl.useProgram(obj2Program);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l1_Ia"), l1_Ia[0], l1_Ia[1], l1_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l1_Id"), l1_Id[0], l1_Id[1], l1_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l1_Is"), l1_Is[0], l1_Is[1], l1_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l1_dir"), l1_dir[0], l1_dir[1], l1_dir[2]);

    gl.useProgram(obj3Program);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l1_Ia"), l1_Ia[0], l1_Ia[1], l1_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l1_Id"), l1_Id[0], l1_Id[1], l1_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l1_Is"), l1_Is[0], l1_Is[1], l1_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l1_dir"), l1_dir[0], l1_dir[1], l1_dir[2]);
}

function sendLight2Uniforms() {
    let l2_p0, l2_Ia, l2_Id, l2_Is;

    if(light2Flag === 1) {
        l2_p0 = vec3(10.0, -100.0, -100.0);
        l2_Ia = vec3(0.1, 0.1, 0.1);
        l2_Id = vec3(1.0, 1.0, 1.0);
        l2_Is = vec3(0.1, 0.1, 0.1);
    } else {
        l2_p0 = vec3(0.0, 0.0, 0.0);
        l2_Ia = vec3(0.0, 0.0, 0.0);
        l2_Id = vec3(0.0, 0.0, 0.0);
        l2_Is = vec3(0.0, 0.0, 0.0);
    }
    
    gl.useProgram(obj1Program);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l2_Ia"), l2_Ia[0], l2_Ia[1], l2_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l2_Id"), l2_Id[0], l2_Id[1], l2_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l2_Is"), l2_Is[0], l2_Is[1], l2_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj1Program, "l2_p0"), l2_p0[0], l2_p0[1], l2_p0[2]);

    gl.useProgram(obj2Program);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l2_Ia"), l2_Ia[0], l2_Ia[1], l2_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l2_Id"), l2_Id[0], l2_Id[1], l2_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l2_Is"), l2_Is[0], l2_Is[1], l2_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj2Program, "l2_p0"), l2_p0[0], l2_p0[1], l2_p0[2]);

    gl.useProgram(obj3Program);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l2_Ia"), l2_Ia[0], l2_Ia[1], l2_Ia[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l2_Id"), l2_Id[0], l2_Id[1], l2_Id[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l2_Is"), l2_Is[0], l2_Is[1], l2_Is[2]);
    gl.uniform3f(gl.getUniformLocation(obj3Program, "l2_p0"), l2_p0[0], l2_p0[1], l2_p0[2]);
}

function sendProjectionUniform() {
    gl.useProgram(obj1Program);
    projectionFlag === -1 ? gl.uniformMatrix4fv(projectionLocation1, false, P_persp) : gl.uniformMatrix4fv(projectionLocation1, false, P_orth);
    gl.useProgram(obj2Program);
    projectionFlag === -1 ? gl.uniformMatrix4fv(projectionLocation2, false, P_persp) : gl.uniformMatrix4fv(projectionLocation2, false, P_orth);
    gl.useProgram(obj3Program);
    projectionFlag === -1 ? gl.uniformMatrix4fv(projectionLocation3, false, P_persp) : gl.uniformMatrix4fv(projectionLocation3, false, P_orth);
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