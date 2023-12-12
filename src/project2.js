// Name: Jacob Desilets and Martin Duffy

let gl;
var canvas;
var table;
var present;
var candle;
var overheadLight;
var candleLight;

let woodTextureUrl = "https://media.istockphoto.com/id/484096068/photo/wooden-texture-background.webp?b=1&s=170667a&w=0&k=20&c=RWLEm-1NkqPzEgrX0zRid7WHtclBQBmI4RQZlouc02g=";
let giftTextureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMkikB0yqsbphfbJ6vccDDYYONa1j5vqYPw&usqp=CAU";
let candleTextureUrl = "https://media.istockphoto.com/id/481266709/photo/wax-texture.jpg?s=2048x2048&w=is&k=20&c=w01Sn-ERoKqOtSdE92rrTVX4Q_cEgfs4sN234XeO-6g=";

function setCanvas() {
  canvas = document.getElementById("gl-canvas");
  var width = Math.min(window.innerWidth, window.innerHeight) - 100;
  if (canvas.width == width) return;
  canvas.width  = width;
  canvas.height = width;
  gl = WebGLUtils.setupWebGL(canvas);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.2, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  if (!gl) alert("WebGL 2.0 isn't available");
  return gl;
}

function initGL() {
  setCanvas();
  table = new Object(gl, obj1, 0.0, 0.0, 0.0);
  present = new Object(gl, obj2, 1.3, -0.10, 0.0);
  candle = new Object(gl, obj3, -1.3, 0.13, 0.8)

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
  let M = [
    u[0], v[0], n[0], 0.0,
    u[1], v[1], n[1], 0.0,
    u[2], v[2], n[2], 0.0,
    -dot(e, u), -dot(e, v), -dot(e, n), 1.0
  ];

  let margin = 2.0;
  let left = -margin;
  let right = margin;
  let top_ = margin;
  let bottom = -margin;
  let near = 15.0 - margin;
  let far = 20.0 + margin;

  P_persp = [
    2.0 * near / (right - left), 0.0, 0.0, 0.0,
    0.0, 2.0 * near / (top_ - bottom), 0.0, 0.0,
    (right + left) / (right - left), (top_ + bottom) / (top_ - bottom),
      -(far + near) / (far - near), -1.0,
    0.0, 0.0, -2.0 * far * near / (far - near), 0.0
  ];

  let MIT = [
    u[0], v[0], n[0], e[0],
    u[1], v[1], n[1], e[1],
    u[2], v[2], n[2], e[2],
    0.0, 0.0, 0.0, 1.0
  ];

  table.projection(M, P_persp, MIT);
  present.projection(M, P_persp, MIT);
  candle.projection(M, P_persp, MIT);

  table.texturing(createTexture(woodTextureUrl));
  present.texturing(createTexture(giftTextureUrl));
  candle.texturing(createTexture(candleTextureUrl));

  overheadLight = new Light(
    "l1",
    vec3(0.1, 0.1, 0.1),
    vec3(1.0, 1.0, 1.0),
    vec3(0.1, 0.1, 0.1),
    vec3(0.0, -100.0, 0.0) // Directional
  );

  candleLight = new Light(
    "l2",
    vec3(0.1, 0.1, 0.1),
    vec3(0.75, 0.5, 0.5),
    vec3(0.1, 0.1, 0.1),
    vec3(0, -1, -2)  // Point
  );

  drawObjects();
  keyHandlers();
  flickerCandle();
};

function flickerCandle() {
  let delay = 10;
  amount = Math.random()/10.0 - 0.05;
  for (let i = 0; i < 3; ++i) {
    if (candleLight.Id_[i] + amount > 0.05 && candleLight.Id_[i] + amount < 1) {
      candleLight.Id_[i] += amount;
    }
    if (candleLight.Ia_[i] + amount > 0.1 && candleLight.Ia_[i] + amount < 0.2) {
      candleLight.Ia_[i] += amount;
    }
  }
  candleLight.update([table, present, candle]);
  setTimeout(
    function (){requestAnimationFrame(flickerCandle);}, delay
  );
}


function keyHandlers() {

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case 'W':
            moveGift(0, 1, 0);
            break;
          case 'S':
            moveGift(0, -1, 0);
            break;
          case 'A':
            moveGift(-1, 0, 0);
            break;
          case 'D':
            moveGift(1, 0, 0);
            break;
          case 'X':
            rotateScene();
            break;
          case 'Z':
            toggleOverheadLight(1, 0, 0);
            break;
          case 'C':
            toggleCandleLight(1, 0, 0);
            break;
        }
    };
}

function createTexture(url) {
  let textureImage = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textureImage);
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = function() {
    gl.bindTexture( gl.TEXTURE_2D, textureImage );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return textureImage;
  };
  image.src = url;
  return textureImage;
}

function drawObjects() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  table.draw();
  present.draw();
  candle.draw();
  
  overheadLight.update([table, present, candle]);
  candleLight.update([table, present, candle]);

  requestAnimFrame(drawObjects);
};

function toggleOverheadLight() {
  overheadLight.toggle();
  overheadLight.update([table, present, candle]);
};

function toggleCandleLight() {
  candleLight.toggle();
  candleLight.update([table, present, candle]);
};

function rotateScene() {
  table.beta += 0.1;
  present.beta += 0.1;
  candle.beta += 0.1;
  table.transform();
  present.transform();
  candle.transform();
}

function moveGift(dx, dy, dz) {
  // reduce speed
  dy /= 8.0;
  dx /= 8.0;
  dz /= 8.0;
  // don't move too far
  if (present.offset_y <= -0.10 && dy < 0) { 
    dy = 0;
    present.offset_y = -0.10
  } else if (present.offset_y >= 1.5 && dy > 0) {
    dy = 0;
  }
  if (present.offset_x <= -1.5 && dx < 0 ||
      present.offset_x >= 2.0 && dx > 0) { 
    dx = 0;
  }
  present.offset_y += dy;
  present.offset_x += dx;
  present.offset_z += dz;
  present.transform();
  overheadLight.update([table, present, candle]);
  candleLight.update([table, present, candle]);
}

