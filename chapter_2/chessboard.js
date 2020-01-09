// Program that prints chessboard, depending on size variable.

let size = 8;
let board = '';

for (let row = 0; row < size; row++) {

    // Odd rows.
    if (row % 2 !== 0) {
        for (field = 0; field < size; field++) {
            if (field % 2 !== 0) board += ' ';
            else board += '#';
        }
    }

    // Even rows.
    else {
        for (field = 0; field < size; field++) {
            if (field % 2 !== 0) board += '#';
            else board += ' ';
        }
    }

    // Add new line.
    board += '\n';
}

console.log(board);
