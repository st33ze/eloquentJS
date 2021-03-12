/* Conway’s Game of Life is a simple simulation that creates artificial “life” on a grid,
each cell of which is either alive or not. Each generation (turn), the following rules are
applied:
- Any live cell with fewer than two or more than three live neighbors dies.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any dead cell with exactly three live neighbors becomes a live cell.
A neighbor is defined as any adjacent cell, including diagonally adjacent ones.

Note that these rules are applied to the whole grid at once, not one square at a time.
That means the counting of neighbors is based on the situation at the start of the
generation, and changes happening to neighbor cells during this generation should not
influence the new state of a given cell.

Implement this game using whichever data structure you find appropriate. Use Math.random 
to populate the grid with a random pattern initially. Display it as a grid of checkbox 
fields, with a button next to it to advance to the next generation. When the user checks
or unchecks the checkboxes, their changes should be included when computing the next
generation. */


const grid = document.getElementById("grid");
const button = document.getElementById("next");
const gridSize = [15];
const gridElements = [];

populateGrid(...gridSize);
button.addEventListener("click", getNextGen);


function populateGrid(x, y) {
    if (!y) y = x;
    grid.style = `grid-template-columns: repeat(${x}, auto);`

    for (let row = 0; row < y; row++) {
        let newRow = []
        for (let col = 0; col < x; col++) {
            let cell = document.createElement("input");
            cell.type = "checkbox";
            cell.className = "cell";
            grid.appendChild(cell);
            newRow.push(cell);
        }
        gridElements.push(newRow);
    }

    // Initialize first generation with 15% living cells.
    const livingCells = getRandomCells(x, y, Math.floor(x * y * 0.15));
    livingCells.forEach(cell => {
        let row = cell[0];
        let col = cell[1];
        gridElements[row][col].checked = true;
    })
}

function getRandomCells(colLength, rowLength, amount) {
    let cells = [];

    while (cells.length < amount) {
        let col = Math.floor(Math.random() * colLength);
        let row = Math.floor(Math.random() * rowLength);
        let duplicate = false;

        cells.forEach(cell => {
            if (cell[0] === row && cell[1] === col) duplicate = true;
        })

        if (!duplicate) cells.push([row, col]);
    }

    return cells;
}

function getNextGen() {
    const oldGen = gridElements.map(row => row.map(cell => cell.checked));

    for (let i = 0; i < oldGen.length; i++) {
        for (let j = 0; j < oldGen[i].length; j++) {
            let livingNeighbors = 0;
            let neighborsCords = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1],
                                  [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
            
            neighborsCords.forEach(cord => {
                if (cord[0] >= 0 && cord[0] < oldGen.length &&
                    cord[1] >= 0 && cord[1] < oldGen[i].length &&
                    oldGen[cord[0]][cord[1]]) 
                    livingNeighbors++;
            });
            
            let cell = gridElements[i][j];
            if (!cell.checked && livingNeighbors === 3)
                cell.checked = true;
            else if (cell.checked && (livingNeighbors < 2 || livingNeighbors > 3))
                cell.checked = false;
        }
    }
}

