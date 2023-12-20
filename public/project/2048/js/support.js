// Global variables
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

// Get the top position of the cell
function getPosTop(i, j) {
    return cellSpace + i*(cellSpace + cellSideLength);
}

// Get the left position of the cell
function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

// Get the background color of the cell
function getNumberBackgroundColor(number) {
    switch(number) { // Switch statement to return the background color
        case 2:
            return"#eee4da";
            break;
        case 4:
            return"#ede0c8";
            break;
        case 8:
            return"#f2b179";
            break;
        case 16:
            return"#f59563";
            break;
        case 32:
            return"#f67e5f";
            break;
        case 64:
            return"#f65e3b";
            break;
        case 128:
            return"#edcf72";
            break;
        case 256:
            return"#edcc61";
            break;
        case 512:
            return"#9c0";
            break;
        case 1024:
            return"#33b5e5";
            break;
        case 2048:
            return"#09c";
            break;
        case 4096:
            return"#a6c";
            break;
        case 8192:
            return"#93c";
            break;
    }

    return "black";
}

// Get the color of the number
function getNumberColor(number) { 
    if(number <= 4) { // If the number is less than or equal to 4, return white
        return "#776e65";
    }

    return "white";
}

// Check if there is any space left on the board
function nospace(board) {
    for(var i = 0; i < 4; i++) { // Loop through the board
        for (var j = 0; j < 4; j++) { // Loop through the board
            if(board[i][j] == 0) { // If the board is empty
                return false;
            }
        }
    }

    return true;
}

// Check if the board can move left
function canMoveLeft(board) { 
    for(var i = 0; i < 4; i++) { // Loop through the board
        for (var j = 1; j < 4; j++) { // Loop through the board
            if(board[i][j] != 0) { // If the board is not empty
                if(board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) { // If the board is empty or the number is the same
                    return true;
                }
            }
        }
    }

    return false;
}

// Check if the board can move up
function canMoveUp(board) {
    for(var i = 1; i < 4; i++) { // Loop through the board
        for (var j = 0; j < 4; j++) { // Loop through the board
            if(board[i][j] != 0) { // If the board is not empty
                if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) { // If the board is empty or the number is the same
                    return true;
                }
            }
        }
    }

    return false;
}

// Check if the board can move right
function canMoveRight(board) {
    for(var i = 0; i < 4; i++) { // Loop through the board
        for (var j = 2;j > -1; j--) { // Loop through the board
            if(board[i][j] != 0) { // If the board is not empty
                if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) { // If the board is empty or the number is the same
                    return true;
                }
            }
        }
    }

    return false;
}

// Check if the board can move down
function canMoveDown(board) {
    for(var i = 2;i > -1; i--) { // Loop through the board
        for (var j = 0; j < 4; j++) { // Loop through the board
            if(board[i][j] != 0) { // If the board is not empty
                if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) { // If the board is empty or the number is the same
                    return true;
                }
            }
        }
    }

    return false;
}

// Check if there is a horizontal block between two cells
function noBlockHorizontal(row, col1, col2, board) {
    for(var i = col1 + 1; i < col2; i++) { // Loop through the board
        if(board[row][i] != 0) { // If the board is not empty
            return false;
        }
    }

    return true;
}

// Check if there is a vertical block between two cells
function noBlockVertical(col, row1, row2, board) {
    for(var i = row1 + 1; i < row2; i++) { // Loop through the board
        if(board[i][col] != 0) { // If the board is not empty
            return false;
        }
    }

    return true;
}

// Check if the board can move
function noMove(board) { 
    if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) { // If the board can move
        return false;
    }

    return true;
}