function setup() {
  // Get the canvas element
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  // Variable declarations
  let sliders = [];
  let sliderValue = [];
  let start;
  let elapsed;
  let cycle = 100000;
  let stack = [mat3.create()];
  let res;
  let tObj;
  let trackSize;
  let cart;

  // Pushes a point and its derivative to the stack
  function pushHermitePoint(p, d) {
    let last = res[res.length - 1];
    res.push([last[2], last[3], p, d]);
  }

  // Returns the proportion of the current cycle
  function getProportionInTime() {
    return (elapsed % cycle) / cycle;
  }

  // Converts degrees to radians
  function radian(angle) {
    return (angle * Math.PI) / 180;
  }

  // Saves the current transformation matrix
  function save() {
    stack.unshift(mat3.clone(stack[0]));
  }

  // Restores the last transformation matrix
  function restore() {
    stack.shift();
  }

  // Multiplies the current transformation matrix by T
  function multi(T) {
    return mat3.multiply(stack[0], stack[0], T);
  }

  // Moves the current transformation matrix to (x, y)
  function moveTo(x, y) {
    let pt = vec2.create();
    vec2.transformMat3(pt, [x, y], stack[0]);
    ctx.moveTo(pt[0], pt[1]);
  }

  // Draws a line from the current transformation matrix to (x, y)
  function lineTo(x, y) {
    let pt = vec2.create();
    vec2.transformMat3(pt, [x, y], stack[0]);
    ctx.lineTo(pt[0], pt[1]);
  }

  // Draws a circle with center (x, y) and radius
  function circle(x, y, radius, start, end) {
    for (let a = start; a < end; ++a) {
      // Draw a circle
      lineTo(
        x + radius * Math.cos(radian(a)),
        y + radius * Math.sin(radian(a)),
      );
    }
  }

  // Fills a rectangle with color
  function fillRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    moveTo(x, y);
    lineTo(x + w, y);
    lineTo(x + w, y + h);
    lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();
  }

  // Draws the rollercoaster track
  function rollercoaster(fillColor, strokeColor) {
    save(); // Save the current transformation matrix

    // Variable declarations
    let cLen = 30;
    let cHei = 10;
    let dHei = 1;
    let head = 4;
    let dStart = 2;
    let wheel = 3;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    let T_to_rollercoaster_center = mat3.create();

    mat3.fromTranslation(T_to_rollercoaster_center, [-cLen / 2, 0]); // Translate to the center of the rollercoaster
    multi(T_to_rollercoaster_center);
    fillRect(0, 0, cLen, cHei, fillColor); // Draw the rollercoaster
    moveTo(cLen / 2, cHei);
    lineTo(cLen / 2, cHei + head);
    moveTo(cLen / 2, cHei);
    lineTo(cLen / (2 + 8), cHei + 5);
    moveTo(cLen / 2, cHei);
    lineTo(cLen / (2 - 8), cHei + 5);
    ctx.stroke();
    ctx.closePath();
    fillRect(dStart, cHei / 2 - dHei, cLen - dStart - 2, dHei * 2, "#FFFFFF"); // Draw the door

    // Draw the wheels
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "#ffdbac";
    circle(cLen / 2, cHei + head * 2, head, 0, 360);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Draw the wheels
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    circle(wheel, 0, wheel, 0, 360);
    ctx.closePath;
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    circle(cLen - wheel, 0, wheel, 0, 360);
    ctx.closePath;
    ctx.stroke();
    ctx.fill();

    restore(); // Restore the last transformation matrix
  }

  // Positions the rollercoaster
  function positionRollercoaster(tObj) {
    save(); // Save the current transformation matrix

    // Translate the rollercoaster to the correct position
    let T_to_obj = mat3.create();
    mat3.fromTranslation(T_to_obj, composite(tObj, hermiteCurve));
    mat3.scale(T_to_obj, T_to_obj, [1 / 50, 1 / 50]);
    let T_to_obj_rot = mat3.create();
    let tan = composite(tObj, hermiteDerivative);
    let angle = Math.atan2(tan[1], tan[0]);
    mat3.rotate(T_to_obj_rot, T_to_obj_rot, angle);
    multi(T_to_obj);
    multi(T_to_obj_rot);
    rollercoaster("#FFA500", "#FFA500");

    restore(); // Restore the transformation matrix
  }

  // Updates the slider values
  function sliderUpdate() {
    for (let i = 1; i <= 2; ++i) {
      // Loop through the sliders
      if (sliderValue[i] != sliders[i].value) {
        // If the slider value has changed
        sliderValue[i] = sliders[i].value;
        if (i == 1) {
          // If the slider is the first slider
          cart = sliders[i].value;
        }
        if (i == 2) {
          // If the slider is the second slider
          trackSize = sliders[2].value / 10000;
          hermiteInit();
        }
      }
    }
  }

  // Initialize the sliders
  function sliderInit() {
    for (let i = 1; i <= 2; ++i) {
      // Loop through the sliders
      sliders[i] = document.getElementById("slider" + i);
      sliders[i].addEventListener("input", draw);
    }

    // Set the slider values
    sliders[1].value = sliders[1].min;
    sliders[2].value = sliders[2].middle;
    sliderUpdate();
  }

  // Initialize the hermite curve
  function hermiteInit() {
    // Variable declarations
    res = [];
    res[0] = [
      [0, 0],
      [-1, 1],
      [0.8, 1],
      [2.5, -0.7],
    ];
    let magnifier;
    let bender;

    for (let i = 0; i < 8; ++i) {
      // Initialize the hermite curve
      let j = i + 2;
      magnifier = (j <= 4 ? j : 10 - j) * trackSize + 1;
      bender = i * trackSize + 1;
      pushHermitePoint(
        [j, trackSize * magnifier * Math.pow(-1, j - 1)],
        [1.5 * magnifier * bender, magnifier],
      );
    }

    pushHermitePoint([9.5, 0], [3, 4]); // Push the last point

    for (let i = 0; i < 5; ++i) {
      // Initialize the hermite curve
      let j = i + 10;
      magnifier = i * trackSize - 1;
      pushHermitePoint(
        [j + 0.5, 3 + magnifier],
        [-magnifier * magnifier * (0.8 - 1.5), 0],
      );
      pushHermitePoint(
        [j + 1, 0 - magnifier],
        [magnifier * magnifier * (0.8 + 2), 0],
      );
    }

    // Initialize the hermite curve
    pushHermitePoint([10, -0], [-20, 0]);
    pushHermitePoint([0, 0], [-1, 1]);
  }

  function hermiteCurve(t) {
    // Returns the hermite basis
    return [
      2 * t * t * t - 3 * t * t + 1,
      t * t * t - 2 * t * t + t,
      -2 * t * t * t + 3 * t * t,
      t * t * t - t * t,
    ];
  }

  function hermiteDerivative(t) {
    // Returns the hermite derivative
    return [
      6 * t * t - 6 * t,
      3 * t * t - 4 * t + 1,
      -6 * t * t + 6 * t,
      3 * t * t - 2 * t,
    ];
  }

  function hermiteCubic(Basis, P, t) {
    // Returns the hermite cubic
    // Variable declarations
    let b = Basis(t);
    let result = vec2.create();
    vec2.scale(result, P[0], b[0]);
    vec2.scaleAndAdd(result, result, P[1], b[1]);
    vec2.scaleAndAdd(result, result, P[2], b[2]);
    vec2.scaleAndAdd(result, result, P[3], b[3]);
    return result;
  }

  // Returns the composite of the hermite curve
  function composite(t, B) {
    for (let i = 0; i < res.length; ++i) {
      // Loop through the hermite curve
      if (i <= t && t < i + 1) {
        // If the t value is in the current interval
        return hermiteCubic(B, res[i], t < 1 ? t : t % i);
      } else if (t == res.length) {
        // If the t value is the last interval
        return hermiteCubic(B, res[res.length - 1], 1);
      }
    }
  }

  // Draws the curve
  function drawCurve(t0, t1, granularity, curve, T, color, P, thickness) {
    // Variable declarations
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    ctx.beginPath(); // Begin the path
    P ? moveTo(curve(hermiteCurve, P, t0), T) : moveTo(curve(t0), T); // Move to the first point

    for (let i = 0; i <= granularity; ++i) {
      // Loop through the curve
      let p = (granularity - i) / granularity;
      let t = p * t0 + (i / granularity) * t1;
      let coordinate = P ? curve(hermiteCurve, P, t) : curve(t);
      lineTo(coordinate[0], coordinate[1]);
    }

    ctx.stroke(); // Draw the curve
  }

  // Shifts the matrix
  function shiftMatrix(x, y) {
    for (let i = 1; i < res.length; ++i) {
      // Shifts the matrix
      res[i][0][0] += x;
      res[i][3][0] += x;
      res[i][0][1] += y;
      res[i][3][1] += y;
    }
  }

  // Draws the scene
  function draw(timestamp) {
    canvas.width = canvas.width; // Clear the canvas
    sliderUpdate(); // Update the slider values
    timestamp = Date.now(); // Get the current time

    if (start === undefined) {
      // If the start time is undefined
      start = timestamp;
    }

    elapsed = timestamp - start; // Get the elapsed time
    save(); // Save the transformation matrix
    let T_to_curve = mat3.create(); // Create the transformation matrix
    mat3.fromTranslation(T_to_curve, [100, 450]); // Translate the transformation matrix
    mat3.scale(T_to_curve, T_to_curve, [55, -55]); // Scale the transformation matrix
    multi(T_to_curve); // Multiply the transformation matrix
    let shift = 0.04; // Set the shift value

    for (let track = 0; track < 1; ++track) {
      // Loop through the tracks
      if (track == 1) {
        // If the track is the second track
        shiftMatrix(shift, shift);
      }
      for (let i = 0; i < res.length; ++i) {
        // Loop through the hermite curve
        drawCurve(0, 1, 200, hermiteCubic, T_to_curve, "black", res[i], 2);
      }
      if (track == 1) {
        // If the track is the second track
        shiftMatrix(-shift, -shift);
      }
    }

    let t_diff = 2.5; // Set the t_diff value
    shiftMatrix(shift / 2, shift / 2); // Shift the matrix
    tObj = getProportionInTime() * res.length; // Get the t value

    for (let i = 0; i < cart; ++i) {
      // Loop through the carts
      positionRollercoaster(((tObj + i) * t_diff) % res.length);
    }

    shiftMatrix(-shift / 2, -shift / 2); // Shift the matrix

    restore(); // Restore the original transformation matrix
    window.requestAnimationFrame(draw); // Request that the browser calls draw again "before the next repaint"
  }

  sliderInit(); // initialize sliders
  window.requestAnimationFrame(draw); // start animation
}

window.onload = setup();
