function Tetris() {
  // Check if the position is valid
  class Shape {
    height;
    width;

    // Constructor
    constructor(type, color, rotation) {
      this.squares = shapes[type];
      this.color = color;
      this.rotation = rotation % 4;
      this.updateWidthNHeight();
    }

    // Generate a random shape
    static getRandom() {
      return new Shape(
        parseInt(Math.random() * shapes.length),
        parseInt(Math.random() * colors.length),
        0,
      );
    }

    // Get the squares of the shape
    getSquares() {
      return this.squares[this.rotation];
    }

    // Draw the shape
    drawShape(x, y) {
      setColor(this.color);
      for (var i = 0; i < this.getSquares().length; i++) {
        drawSquare(
          x + scale * this.getSquares()[i][0],
          y + scale * this.getSquares()[i][1],
        );
      }
    }

    // Update the width and height of the shape
    updateWidthNHeight() {
      this.width = 0;
      this.height = 0;
      for (var i = 0; i < this.getSquares().length; i++) {
        this.width = Math.max(this.width, this.getSquares()[i][0] + 1);
        this.height = Math.max(this.height, this.getSquares()[i][1] + 1);
      }
      return 0;
    }

    // Rotate the shape to the left
    rotateLeft() {
      this.rotation--;
      if (this.rotation < 0) {
        this.rotation = this.squares.length - 1;
      }
      this.updateWidthNHeight();
    }

    // Rotate the shape to the right
    rotateRight() {
      this.rotation++;
      if (this.rotation > this.squares.length - 1) {
        this.rotation = 0;
      }
      this.updateWidthNHeight();
    }
  }

  // Different shapes of the Tetris
  const shapes = [
    [
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
    ],
    [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 0],
      ],
    ],
    [
      [
        [1, 0],
        [0, 1],
        [0, 2],
        [0, 0],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 1],
        [0, 1],
      ],
      [
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 1],
        [2, 0],
      ],
    ],
    [
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 1],
      ],
    ],
    [
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
    ],
  ];

  // Get Canvas elements
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  const FrameRate = 10;
  const UpdateRate = 100;
  const colors = ["#1a535c", "#4ecdc4", "#ff6b6b", "#ffe66d", "#88c198"];
  const scale = 20;
  const dx = 20;
  const dy = 30;
  const boardRows = 24;
  const boardCols = 10;
  const helpingHeight = 3;
  var board = new Array(boardRows);

  for (var i = 0; i < boardRows; i++) {
    // Initialize the board
    board[i] = new Array(boardCols);
    for (var j = 0; j < boardCols; j++) {
      board[i][j] = -1;
    }
  }

  // Variables
  var frameCount = 0;
  var updateCount = 0;
  var currentHeight = 0;
  var currentPose = boardCols / 2;
  var currentUpdates = 0;
  var updateSpeed = 40;
  var settledUpdates = 0;
  var maximumSettledUpdates = 5;
  var movingShape = Shape.getRandom();
  var nextShape = Shape.getRandom();
  var lastPosition = [currentPose, currentHeight];
  var score = 0;

  // Set the color of the shape
  function setColor(color) {
    context.strokeStyle = colors[color];
    context.fillStyle = colors[color];
  }

  // Draw the grid
  function drawGrid(x, y, height, width) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    for (var i = 0; i < width + 1; i++) {
      context.moveTo(x + i * scale, y);
      context.lineTo(x + i * scale, y + height * scale);
    }
    for (var i = 0; i < height + 1; i++) {
      context.moveTo(x, y + i * scale);
      context.lineTo(x + width * scale, y + i * scale);
    }
    context.stroke();
  }

  // Draw a square
  function drawSquare(x, y, size = scale) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + size, y);
    context.lineTo(x + size, y + size);
    context.lineTo(x, y + size);
    context.closePath();
    context.fill();
    context.stroke();
  }

  // Draw the board
  function drawBoard() {
    for (var row = 0; row < boardRows; row++) {
      for (var col = 0; col < boardCols; col++) {
        if (board[row][col] != -1) {
          setColor(board[row][col]);
          drawSquare(dx + col * scale, dy + row * scale);
        }
      }
    }
    drawGrid(dx, dy, boardRows, boardCols, scale);
  }

  // Draw the next shape
  function drawNextShape() {
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(230, 165);
    context.lineTo(230, 300);
    context.lineTo(340, 300);
    context.lineTo(340, 165);
    context.closePath();
    context.fill();
    context.stroke();
    context.lineTo(230, 190);
    context.lineTo(340, 190);
    context.fill();
    context.stroke();
    context.fillStyle = "red";
    context.font = "20px Arial";
    context.textAlign = "center";
    context.fillText("Next Piece:", 285, 185);
    nextShape.drawShape(
      230 + (110 - nextShape.width * scale) / 2,
      190 + (110 - nextShape.height * scale) / 2,
    );
  }

  // Draw the background
  function drawBackground() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(0, canvas.height);
    context.closePath();
    context.fill();
    context.stroke();
  }

  // Draw the score
  function drawScore() {
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(230, 60);
    context.lineTo(230, 130);
    context.lineTo(340, 130);
    context.lineTo(340, 60);
    context.closePath();
    context.fill();
    context.stroke();
    context.lineTo(230, 85);
    context.lineTo(340, 85);
    context.fill();
    context.stroke();
    context.fillStyle = "red";
    context.font = "20px";
    context.textAlign = "center";
    context.fillText("Score:", 285, 80);
    context.font = "25px";
    context.fillText(score, 285, 115);
  }

  // Draw the game
  function draw() {
    drawBackground();
    drawNextShape();
    drawScore();
    movingShape.drawShape(dx + currentPose * scale, dy + currentHeight * scale);
    drawBoard();

    frameCount++;
  }

  // Check if the shape can move to the given position
  function canMove(shape, x, y) {
    if (y + shape.height > boardRows) return false;
    for (var i = 0; i < movingShape.getSquares().length; i++) {
      if (
        movingShape.getSquares()[i][1] + y >= boardRows ||
        movingShape.getSquares()[i][0] + x >= boardCols
      )
        return false;
      if (
        movingShape.getSquares()[i][1] + y < 0 ||
        movingShape.getSquares()[i][0] + x < 0
      )
        return false;
      if (
        board[movingShape.getSquares()[i][1] + y][
          movingShape.getSquares()[i][0] + x
        ] != -1
      ) {
        return false;
      }
    }
    return true;
  }

  // Set the shape on the board
  function setShape(shape) {
    for (var i = 0; i < shape.getSquares().length; i++) {
      board[shape.getSquares()[i][1] + currentHeight][
        shape.getSquares()[i][0] + currentPose
      ] = shape.color;
    }
  }

  // Update the slider max value
  function updateSliderMaxValue() {
    var max = boardCols - movingShape.width;
    slider1.setAttribute("max", max);
    if (currentPose > max) {
      currentPose = max;
    }
  }

  // Check if there is a full line
  function checkForFullLine() {
    var rowsToClear = new Array();
    for (var row = 0; row < boardRows; row++) {
      for (var col = 0; col < boardCols; col++) {
        if (board[row][col] == -1) break;
        if (col == boardCols - 1) {
          rowsToClear.push(row);
        }
      }
    }
    if (rowsToClear.length == 0) return;
    console.log(rowsToClear.length);
    score += Math.pow(rowsToClear.length, 2) * 1000;
    board.splice(rowsToClear[0], rowsToClear.length);
    for (var i = 0; i < rowsToClear.length; i++) {
      board.unshift(new Array(boardCols));
      for (var j = 0; j < boardCols; j++) {
        board[0][j] = -1;
      }
    }
    if (updateSpeed > 30) {
      updateSpeed -= rowsToClear.length * 1;
    } else if (updateSpeed > 20) {
      updateSpeed -= rowsToClear.length * 0.4;
    } else if (updateSpeed > 10) {
      updateSpeed -= rowsToClear.length * 0.2;
    } else if (updateSpeed > 4) {
      updateSpeed -= rowsToClear.length * 0.1;
    }
  }

  // Automatically drop the shape down
  function dropShape() {
    setShape(movingShape);
    checkForFullLine();
    movingShape = nextShape;
    nextShape = Shape.getRandom();
    updateSliderMaxValue();
    currentHeight = 0;
    if (!canMove(movingShape, currentPose, currentHeight)) {
      console.log("GameOver");
      updateSpeed = 10000000;
    }
  }

  // Drop the shape
  function drop() {
    while (canMove(movingShape, currentPose, currentHeight + 1)) {
      currentHeight++;
      score += 10;
    }
    console.log(score);
    dropShape();
  }

  // Update the game
  function UpdateGame() {
    while (currentPose < parseInt(slider1.value)) {
      currentPose++;
      canShapeMove = false;
      for (var addedHeight = 0; addedHeight < helpingHeight; addedHeight++) {
        if (canMove(movingShape, currentPose, currentHeight - addedHeight)) {
          canShapeMove = true;
          currentHeight -= addedHeight;
          break;
        }
      }
      if (!canShapeMove) {
        currentPose--;
        break;
      }
    }
    while (currentPose > parseInt(slider1.value)) {
      currentPose--;
      canShapeMove = false;
      for (var addedHeight = 0; addedHeight < helpingHeight; addedHeight++) {
        if (canMove(movingShape, currentPose, currentHeight - addedHeight)) {
          canShapeMove = true;
          currentHeight -= addedHeight;
          break;
        }
      }
      if (!canShapeMove) {
        currentPose++;
        break;
      }
    }
    if (currentUpdates >= updateSpeed) {
      currentUpdates = 0;
      if (!canMove(movingShape, currentPose, currentHeight + 1)) {
        if (settledUpdates >= maximumSettledUpdates) {
          dropShape();
        }
        if (
          lastPosition[0] == currentPose &&
          lastPosition[1] == currentHeight
        ) {
          settledUpdates++;
        } else {
          settledUpdates = 0;
          lastPosition = [currentPose, currentHeight];
        }
      } else {
        settledUpdates = 0;
        currentHeight++;
      }
    }
    updateCount++;
    currentUpdates++;
  }

  // Rotate the shape left
  function rotateLeft() {
    var width = movingShape.width;
    movingShape.rotateLeft();
    currentPose = Math.min(boardCols - movingShape.width, width);
    if (!canMove(movingShape, currentPose, currentHeight)) {
      for (var i = 1; i < helpingHeight; i++) {
        if (currentHeight - i < 0) break;
        if (canMove(movingShape, currentPose, currentHeight - i)) {
          currentHeight = currentHeight - i;
          updateSliderMaxValue();
          return;
        }
      }
      movingShape.rotateRight();
    }
    updateSliderMaxValue();
  }

  // Rotate the shape right
  function rotateRight() {
    var width = movingShape.width;
    movingShape.rotateRight();
    currentPose = Math.min(boardCols - movingShape.width, width);
    if (!canMove(movingShape, currentPose, currentHeight)) {
      for (var i = 1; i < helpingHeight; i++) {
        if (currentHeight - i < 0) break;
        if (canMove(movingShape, currentPose, currentHeight - i)) {
          currentHeight = currentHeight - i;
          updateSliderMaxValue();
          return;
        }
      }
      movingShape.rotateLeft();
    }
    updateSliderMaxValue();
  }

  // Run event listeners
  updateSliderMaxValue();
  setInterval(UpdateGame, FrameRate / 1000);
  setInterval(draw, UpdateRate / 1000);
  leftButton.addEventListener("click", rotateLeft);
  rightButton.addEventListener("click", rotateRight);
  dropButton.addEventListener("click", drop);
}

window.onload = Tetris(); // Start the game
