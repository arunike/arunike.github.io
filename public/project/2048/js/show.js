// Show the number on the board and set the color and background color
function showNumber(i, j, randNumber) { 
    var numberCell = $("#number-cell-" + i + "-" + j); // Get the number cell

    // Set background color and number color
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({ // Animate the number cell
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

// Show the animation of the number cell
function showMoveAnimation(fromX, fromY, tox,toy) {
    var numberCell = $("#number-cell-" + fromX + "-" + fromY); // Get the number cell

    numberCell.animate({ // Animate the number cell
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

// Update the score
function updateScore(score) { 
    $("#score").text(score);
}