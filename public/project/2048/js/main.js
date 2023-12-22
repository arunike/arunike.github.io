// Global variables
var board = new Array();
var score = 0;
var hasConflicted = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

// When the page is loaded and ready, load the game
$(document).ready(function () { 
    prepareForMobile();
    newGame();
});

// If the browser is a mobile browser, the width of the grid container is set to 100% of the screen width
function prepareForMobile() {
    if(documentWidth > 500) { // If the screen width is greater than 500, the grid container width is set to 500
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    // Set dimensions of the grid container
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace); 
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    // Set dimensions of the grid cell
    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

// Start a new game
function newGame() { 
    init();
    generateOneNumber();
    generateOneNumber();
}

// Initialize the game
function init() { 
    for(var i = 0; i < 4; i++) { // Initialize the board array
        for (var j = 0; j < 4; j++) { // Initialize the board array
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 4; i++) { // Initialize the board array
        board[i] = new Array();
        hasConflicted[i] = new Array();

        for (var j = 0; j < 4; j++) { // Initialize the board array
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView(); // Update the view of the board

    score = 0; // Initialize the score
}

// Update the view of the board
function updateBoardView() {
    $(".number-cell").remove(); // Remove all number cells

    for(var i = 0; i < 4; i++) { // Update the view of the board
        for (var j = 0; j < 4; j++) { // Update the view of the board
            $("#grid-container").append('<div className="number-cell" id="number-cell-' + i + '-' + j + '"></div>'); // Add a number cell

            var theNumberCell = $("#number-cell-" + i + "-" + j); // Get the number cell

            if(board[i][j] == 0) { // If the number is 0, the number cell is not displayed
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength * 0.5);
                theNumberCell.css('left',getPosLeft(i, j) + cellSideLength * 0.5);
                theNumberCell.text("");
            } else { // If the number is not 0, the number cell is displayed
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }

    // Set the font size of the number cell
    $('.number-cell').css('line-height', cellSideLength + 'px'); 
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
}

// Generate a number
function generateOneNumber() {
    if(nospace(board)) { // If there is no space, return
        return false;
    }

    // Generate a random number
    var randX = parseInt(Math.floor(Math.random() * 4)); 
    var randY = parseInt(Math.floor(Math.random() * 4));
    var times = 0;

    while (times < 50) { // If the random position is not empty, generate a random position again
        if (board[randX][randY] == 0) { // If the random position is empty, break
            break;
        }

        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if(times == 50) { // If the random position is not empty, traverse the board to find an empty position
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                if(board[i][j] == 0) {
                    randX=i;
                    randY=j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4; // Generate a random number
    board[randX][randY] = randNumber; // Put the random number in the random position

    showNumber(randX, randY, randNumber); // Display the random number

    return true;
}

// Listen to the keyboard event
$(document).keydown(function(event) {
    switch (event.keyCode) { // Get the key code of the keyboard event
        case 37:
            event.preventDefault();

            if(moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }

            break;
        case 38:
            event.preventDefault();

            if(moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }

            break;
        case 39:
            event.preventDefault();

            if(moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }

            break;
        case 40:
            event.preventDefault();

            if(moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }

            break;
        default:
            break;
    }
});

// Listen to the touch event of the start point
document.addEventListener('touchstart', function(event) { 
    event.preventDefault(); // Prevent the default event

    // Get the coordinates of the start point
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener();

// Listen to the touch event of the end point
document.addEventListener('touchend', function(event) { 
    event.preventDefault(); // Prevent the default event

    // Get the coordinates of the end point
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    // Get the horizontal and vertical distance
    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if(Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth) { // If the horizontal and vertical distance is less than 0.3 * documentWidth, return
        return ;
    }

    if(Math.abs(deltaX) > Math.abs(deltaY)) { // If the horizontal distance is greater than the vertical distance, judge the direction of the horizontal distance
        if(deltaX > 0) { // If the horizontal distance is greater than 0, move right
            if(moveRight()) { // If the move is successful, generate a number and judge whether the game is over
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else { // If the horizontal distance is less than 0, move left
            if(moveLeft()){ // If the move is successful, generate a number and judge whether the game is over
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    } else { // If the vertical distance is greater than the horizontal distance, judge the direction of the vertical distance
        if(deltaY > 0) { // If the vertical distance is greater than 0, move down
            if(moveDown()) { // If the move is successful, generate a number and judge whether the game is over
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else { // If the vertical distance is less than 0, move up
            if(moveUp()) { // If the move is successful, generate a number and judge whether the game is over
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
});

// Judge whether the game is over
function isGameOver() {
    if(nospace(board) && noMove(board)) {
        GameOver();
    }
}

// Game over
function GameOver() { 
    alert("Game over!");
}

// Move left
function moveLeft() {
    if(!canMoveLeft(board)) { // If the move is not allowed, return
        return false;
    }

    for(var i = 0; i < 4; i++) { // Traverse the board
        for (var j = 1; j < 4; j++) { // Traverse the board from the second column
            if(board[i][j] != 0) { // If the current position is not empty
                for(var k = 0; k < j; k++) { // Traverse the board from the first column to the current position
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) { // If the current position is empty and there is no block between the current position and the first column
                        showMoveAnimation(i, j, i, k);

                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        break;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) { // If the current position is not empty and the number of the current position is equal to the number of the first column and there is no block between the current position and the first column
                        showMoveAnimation(i, j, i, k);

                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score = score + board[i][k];

                        updateScore(score);

                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200); // Update the board view
    
    return true;
}

// Move up
function moveUp() {
    if(!canMoveUp(board)) { // If the move is not allowed, return
        return false;
    }

    for(var i = 1; i < 4; i++) { // Traverse the board from the second row
        for (var j = 0; j < 4; j++) { // Traverse the board
            if(board[i][j] != 0) { // If the current position is not empty
                for(var k = 0; k < i; k++) { // Traverse the board from the first row to the current position
                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) { // If the current position is empty and there is no block between the current position and the first row
                        showMoveAnimation(i, j, k, j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        break;
                    } else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) { // If the current position is not empty and the number of the current position is equal to the number of the first row and there is no block between the current position and the first row
                        showMoveAnimation(i, j, k, j);

                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score = score + board[k][j];

                        updateScore(score);

                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200); // Update the board view

    return true;
}

// Move right
function moveRight() {
    if(!canMoveRight(board)) { // If the move is not allowed, return
        return false;
    }

    for(var i = 0; i < 4; i++) { // Traverse the board
        for (var j = 2; j > -1; j--) { // Traverse the board from the third column
            if(board[i][j] != 0){ // If the current position is not empty
                for(var k = 3; k > j; k--) { // Traverse the board from the fourth column to the current position
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) { // If the current position is empty and there is no block between the current position and the fourth column
                        showMoveAnimation(i, j, i, k);

                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        break;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) { // If the current position is not empty and the number of the current position is equal to the number of the fourth column and there is no block between the current position and the fourth column
                        showMoveAnimation(i, j, i, k);

                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score = score + board[i][k];

                        updateScore(score);

                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200); // Update the board view

    return true;
}

// Move down
function moveDown() {
    if(!canMoveDown(board)) { // If the move is not allowed, return
        return false;
    }

    for(var i = 2; i > -1; i--) { // Traverse the board from the third row
        for (var j = 0; j < 4; j++) { // Traverse the board
            if(board[i][j] != 0) { // If the current position is not empty
                for(var k = 3; k > i; k--) { // Traverse the board from the fourth row to the current position
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)) { // If the current position is empty and there is no block between the current position and the fourth row
                        showMoveAnimation(i, j, k, j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        break;
                    } else if(board[k][j]==board[i][j]&& noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]) { // If the current position is not empty and the number of the current position is equal to the number of the fourth row and there is no block between the current position and the fourth row
                        showMoveAnimation(i, j, k, j);
                        
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score = score + board[k][j];

                        updateScore(score);

                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    
    return true;
}