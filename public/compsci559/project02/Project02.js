function solarSystem() {
  // Create a new scene

  // Import the required modules
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");
  var slider = document.getElementById("slider");
  slider.value = 5;

  // Variables
  const colors = ["#D6FFF6", "#231651", "#4DCCBD", "#2374AB", "#FF8484"];
  var planets;
  var satellites;
  var particles;

  // Create a mouse object
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  // Create a random integer function
  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Create a random color function
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Create a particle object
  function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2; // Random angle
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(20, 50); // Random distance from center
    this.lastMouse = {
      // Last mouse position
      x: x,
      y: y,
    };

    // Create a last mouse point
    this.update = function () {
      const lastPoint = { x: this.x, y: this.y };
      this.radians += this.velocity;

      // Move last mouse point towards mouse
      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

      // Move position
      this.x =
        this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
      this.draw(lastPoint);
    };

    // Create a draw function to draw the particle
    this.draw = function (lastPoint) {
      c.beginPath();
      c.strokeStyle = randomColor(colors);
      c.lineWidth = this.radius;
      c.moveTo(lastPoint.x, lastPoint.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath();
    };
  }

  // Create an init function
  function init() {
    particles = [];

    // Create a loop to generate particles
    for (var i = 0; i < 50; i++) {
      const radius = Math.random();
      particles.push(
        new Particle(
          canvas.width / 4,
          canvas.height / 4,
          radius,
          randomColor(colors),
        ),
      );
    }
  }

  // Create a planet object
  function planet(x, y, radius, color, velocity, distanceFromMotherPlanet) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = Math.random() * Math.PI * 2; // Random angle
    this.color = color;
    this.velocity = velocity;
    this.distanceFromCenter = distanceFromMotherPlanet;

    // Create an update function
    this.update = function () {
      this.radians += this.velocity;

      // Move position
      this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
    };

    // Create a draw function to draw the planet
    this.draw = function () {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.radians);
      c.scale(1, 1);
      c.beginPath();
      c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    };
  }

  // Create a satellite object
  function satellite(
    x,
    y,
    radius,
    color,
    velocity,
    distanceFromMotherPlanet,
    pNum,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = Math.random() * Math.PI * 2; // Random angle
    this.color = color;
    this.velocity = velocity;
    this.distanceFromCenter = distanceFromMotherPlanet;

    // Create an update function to update the satellite
    this.update = function () {
      this.radians += this.velocity;

      // Move position
      this.x =
        planets[pNum].x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        planets[pNum].y + Math.sin(this.radians) * this.distanceFromCenter;
    };

    // Create a draw function to draw the satellite
    this.draw = function () {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.radians);
      c.scale(1, 1);
      c.beginPath();
      c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = randomColor(colors);
      c.fill();
      c.closePath();
      c.restore();
    };
  }

  // Create a planet array
  function initPlanet() {
    planets = [];
    planets[0] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      (canvas.width / 2) * (1 / 30),
      "#ff0404",
      0,
      0,
    );
    planets[1] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      1.3,
      "#6f6f78",
      0.01,
      (canvas.width / 2) * (1 / 20),
    );
    planets[2] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      1.7,
      "#fffb09",
      0.01,
      (canvas.width / 2) * (1 / 15),
    );
    planets[3] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      2,
      "#52a1ff",
      0.005,
      (canvas.width / 2) * (1 / 10),
    );
    planets[4] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      1,
      "#ffb04c",
      0.005,
      (canvas.width / 2) * (2 / 10),
    );
    planets[5] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      20,
      "#ff7719",
      0.005,
      (canvas.width / 2) * (4 / 10),
    );
    planets[6] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      17,
      "#c8b29b",
      0.003,
      (canvas.width / 2) * (6 / 10),
    );
    planets[7] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      8,
      "#befffd",
      0.002,
      (canvas.width / 2) * (8 / 10),
    );
    planets[8] = new planet(
      canvas.width / 2,
      canvas.height / 2,
      7.5,
      "#112aff",
      0.002,
      (canvas.width / 2) * (9 / 10),
    );
  }

  // Create a satellite array
  function initSat() {
    satellites = [];
    satellites[0] = new satellite(
      planets[5].x,
      planets[5].y,
      1.5,
      "#ddcc53",
      0.02,
      planets[5].radius * 4,
      5,
    );
    satellites[1] = new satellite(
      planets[6].x,
      planets[6].y,
      1.5,
      "#ddb417",
      0.02,
      planets[6].radius * 2,
      6,
    );
    satellites[2] = new satellite(
      planets[5].x,
      planets[5].y,
      1.4,
      "#8f6729",
      0.02,
      planets[5].radius * 3,
      5,
    );
    satellites[3] = new satellite(
      planets[5].x,
      planets[5].y,
      1.3,
      "#ddda6c",
      0.02,
      planets[5].radius * 2,
      5,
    );
    satellites[4] = new satellite(
      planets[3].x,
      planets[3].y,
      1,
      "#ddd3dc",
      0.02,
      planets[3].radius * 3,
      3,
    );
    satellites[5] = new satellite(
      planets[5].x,
      planets[5].y,
      1.2,
      "#34dd4e",
      0.02,
      planets[5].radius * 1.5,
      5,
    );
    satellites[6] = new satellite(
      planets[8].x,
      planets[8].y,
      2,
      "#34dd4e",
      0.02,
      planets[5].radius * 2,
      8,
    );
  }

  // Create an animate function
  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle) {
      // Loop through the particles array
      particle.update();
    });
    planets.forEach(function (planet) {
      // Loop through the planets array
      planet.update();
    });
    satellites.forEach(function (satellite) {
      // Loop through the satellites array
      satellite.update();
    });
    planets.forEach(function (planet) {
      // Loop through the planets array
      planet.draw();
    });
    satellites.forEach(function (satellite) {
      // Loop through the satellites array
      satellite.draw();
    });
  }

  // Add a mousemove event listener
  addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  // Use slider to change the speed of the animation
  slider.addEventListener("input", function () {
    var value = this.value;
    planets.forEach(function (planet) {
      // Loop through the planets array
      planet.velocity = value / 1000;
    });
  });

  // Function calls
  init();
  initPlanet();
  initSat();
  animate();
}

solarSystem(); // Call the solarSystem function
