var clock = null;
var state = 0;
var speed = 2;

function init() {
  for (var i = 0; i < 4; i++) {
    crow();
  }
  $("main").onclick = function (ev) {
    judge(ev);
  };
}

function judge(ev) {
  if (state == 3) {
    alert("Game Over!");
    return;
  }
  if (ev.target.className.indexOf("black") == -1) {
    over();
  } else {
    ev.target.className = "cell";
    ev.target.parentNode.pass = 1;
    score();
  }
}

function start() {
  clock = window.setInterval("move()", 30);
}

function move() {
  var con = $("container");
  var top = parseInt(window.getComputedStyle(con, null)["top"]);

  if (speed + top > 0) {
    top = 0;
  } else {
    top += speed;
    con.style.top = top + "px";
  }
  if (top == 0) {
    crow();
    con.style.top = "-90px";

    draw();
  } else if (top == speed - 90) {
    var rows = con.childNodes;

    if (rows.length == 5 && rows[4].pass !== 1) {
      over();
    }
  }
}

function over() {
  clearInterval(clock);

  state = 3;

  var mes = confirm(
    "Your score: " + $("score").innerHTML + "\nWould you like to play again?",
  );

  if (mes == true) {
    window.location.reload();
  } else {
    window.close();
  }
}

function speedUp() {
  speed += 2;

  if (speed == 20) {
    alert("You are a genius!");
  }
}

function score() {
  var newScore = parseInt($("score").innerHTML) + 1;

  $("score").innerHTML = newScore;

  if (newScore % 10 == 0) {
    speedUp();
  }
}

function crow() {
  var con = $("container");
  var row = createDiv("row");
  var classes = createSequence();

  for (var i = 0; i < 4; i++) {
    row.appendChild(createDiv(classes[i]));
  }
  if (con.firstChild == null) {
    con.appendChild(row);
  } else {
    con.insertBefore(row, con.firstChild);
  }
}

function draw() {
  var con = $("container");

  if (con.childNodes.length == 6) {
    con.removeChild(con.lastChild);
  }
}

function createDiv(className) {
  var div = document.createElement("div");
  div.className = className;

  return div;
}

function createSequence() {
  var arr = ["cell", "cell", "cell", "cell"];
  var i = Math.floor(Math.random() * 4);

  arr[i] = "cell black";

  return arr;
}

function $(id) {
  return document.getElementById(id);
}

init();
start();
