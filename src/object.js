class Object {

  constructor(gl, points, offset_x, offset_y, offset_z) {
    this.gl = gl;
    this.points = points;
    this.program = initShaders(this.gl, "vertex", "fragment");

    this.gl.useProgram(this.program)

    this.Ibuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.Ibuffer);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.points.indexList),
      this.gl.STATIC_DRAW
    );

    this.Vbuffer = gl.createBuffer();
    this.gl.bindBuffer(gl.ARRAY_BUFFER, this.Vbuffer);
    this.gl.bufferData(gl.ARRAY_BUFFER, flatten(this.points.vertices), this.gl.STATIC_DRAW);

    this.Vpointer = this.gl.getAttribLocation(this.program, "vertexPosition");
    this.gl.vertexAttribPointer(this.Vpointer, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.Vpointer);

    this.RxUniform = this.gl.getUniformLocation( this.program, "Rx" );
    this.RyUniform = this.gl.getUniformLocation( this.program, "Ry" );
    this.RzUniform = this.gl.getUniformLocation( this.program, "Rz" );
    this.TransformUniform = this.gl.getUniformLocation( this.program, "Transform" );
    this.ScaleUniform = this.gl.getUniformLocation( this.program, "Scale" );

    this.alpha = 0.0;
    this.beta = 4.0;
    this.gamma = 0.0;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    this.offset_z = offset_z;
    this.scale_x = 2.0;
    this.scale_y = 2.0;
  }

  projection(M, persp, MIT) {
    this.gl.useProgram(this.program);
    this.modelviewLocation = gl.getUniformLocation(this.program, "modelview");
    this.projectionLocation = gl.getUniformLocation(this.program, "projection");
    this.gl.uniformMatrix4fv(this.modelviewLocation, false, M);
    this.gl.uniformMatrix4fv(this.projectionLocation, false, persp);
    let modelViewITLocation3 = gl.getUniformLocation(this.program, "modelviewIT");
    this.gl.uniformMatrix4fv(modelViewITLocation3, false, MIT);

    this.faceNormals = this.getFaceNormals(
      this.points.vertices,
      this.points.indexList,
      this.points.indexList.length / 3
    );

    let vertexNormals = this.getVertexNormals(
      this.points.vertices,
      this.points.indexList,
      this.faceNormals,
      this.points.vertices.length,
      this.points.indexList.length / 3
    );

    this.Nbuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.Nbuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten(vertexNormals), this.gl.STATIC_DRAW);

    this.vertexNormal = this.gl.getAttribLocation(this.program, "vertexNormal");
    this.gl.vertexAttribPointer(this.vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.vertexNormal);

    let ka = vec3(.9, .9, .9);
    let kd = vec3(.9, .9, .9);
    let ks = vec3(1.0, 1.0, 1.0);
    let shininess = 0.1;

    this.gl.uniform3f(this.gl.getUniformLocation(this.program, "ka"), ka[0], ka[1], ka[2]);
    this.gl.uniform3f(this.gl.getUniformLocation(this.program, "kd"), kd[0], kd[1], kd[2]);
    this.gl.uniform3f(this.gl.getUniformLocation(this.program, "ks"), ks[0], ks[1], ks[2]);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, "shininess"), shininess);
  }

  transform() {
    this.gl.useProgram(this.program);
    let Rx = [
      1, 0, 0, 0,
      0, Math.cos(this.alpha), -Math.sin(this.alpha), 0,
      0, Math.sin(this.alpha), Math.cos(this.alpha), 0,
      0, 0, 0, 1
    ];
    let Ry = [
      Math.cos(this.beta), 0, -Math.sin(this.beta), 0,
      0, 1, 0, 0,
      Math.sin(this.beta), 0, Math.cos(this.beta), 0,
      0, 0, 0, 1
    ];
    let Rz = [
      Math.cos(this.gamma),-Math.sin(this.gamma), 0, 0,
      Math.sin(this.gamma), Math.cos(this.gamma), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    let Transform = [this.offset_x, this.offset_y, this.offset_z, 1.0];
    let Scale = [
      this.scale_x, 0.0, 0.0, 0.0,
      0.0, this.scale_y, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv( this.RxUniform, false, Rx );
    gl.uniformMatrix4fv( this.RyUniform, false, Ry );
    gl.uniformMatrix4fv( this.RzUniform, false, Rz );
    gl.uniform4fv( this.TransformUniform, Transform );
    gl.uniformMatrix4fv( this.ScaleUniform, false, Scale );
  }

  draw() {
    this.gl.useProgram(this.program);
    this.transform();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.Vbuffer);
    this.gl.enableVertexAttribArray(this.Vpointer);
    this.gl.vertexAttribPointer(this.Vpointer, 4, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.Nbuffer);
    this.gl.vertexAttribPointer(this.vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.vertexNormal);

    if (this.texture) {
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.uniform1i(this.gl.getUniformLocation(this.program, "texMap0"), 0);
      this.texturing();
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.Ibuffer);
    this.gl.drawElements(
      this.gl.TRIANGLES,
      3 * (this.points.indexList.length / 3),
      gl.UNSIGNED_SHORT,
      0
    );
  }

  lighting(light) {
    this.gl.useProgram(this.program);
    this.gl.uniform3f(
      this.gl.getUniformLocation(this.program, light.name.concat("_Ia")),
      light.Ia(0), light.Ia(1), light.Ia(2)
    );
    this.gl.uniform3f(
      this.gl.getUniformLocation(this.program, light.name.concat("_Id")),
      light.Id(0), light.Id(1), light.Id(2)
    );
    this.gl.uniform3f(
      this.gl.getUniformLocation(this.program, light.name.concat("_Is")),
      light.Is(0), light.Is(1), light.Is(2)
    );
    this.gl.uniform3f(
      this.gl.getUniformLocation(this.program, light.name.concat("_p0")),
      light.p0(0), light.p0(1), light.p0(2)
    );
  }

  texturing(texture) {
    if (texture) this.texture = texture;
    this.gl.useProgram(this.program);
    this.textureVertexbuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.textureVertexbuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten(this.points.texCoords), this.gl.STATIC_DRAW);
    this.textureCoordinate = this.gl.getAttribLocation(this.program,"textureCoordinate");
    this.gl.vertexAttribPointer(this.textureCoordinate, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.textureCoordinate);
  }

  getFaceNormals(vertices, indexList, numTriangles) {
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
    return faceNormals;
  }

  getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles) {
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
    return vertexNormals;
  }
}

