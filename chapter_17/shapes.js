/* Write a program that draws the following shapes on a canvas:
- A trapezoid (a rectangle that is wider on one side)
- A red diamond (a rectangle rotated 45 degrees or ¼π radians)
- A zigzagging line
- A spiral made up of 100 straight line segments
- A yellow star */

let cx = document.querySelector(".shapes").getContext("2d");
const midCanvasY = document.querySelector(".shapes").height / 2;

// TRAPEZOID
function drawTrepezoid(topLeftX, topRightX, bottomLeftX, bottomRightX, height) {
    cx.beginPath();
    const topHeight = midCanvasY - height / 2;
    const bottomHeight = midCanvasY + height / 2;
    cx.moveTo(topLeftX, topHeight);
    cx.lineTo(topRightX, topHeight);
    cx.lineTo(bottomRightX, bottomHeight);
    cx.lineTo(bottomLeftX, bottomHeight);
    cx.closePath();
    cx.stroke();
}

drawTrepezoid(10, 100, 30, 75, 60);


// RED DIAMOND
function drawRedDiamond(midX, size) {

    cx.translate(midX, midCanvasY);
    cx.rotate(0.25 * Math.PI);
    cx.fillStyle = "red";
    cx.fillRect(-size / 2, -size / 2, size, size);
    cx.rotate(-0.25 * Math.PI);
    cx.translate(-midX, -midCanvasY);
}

drawRedDiamond(150, 40);


// ZIGZAGGING LINE
function drawZigzaggingLine(startX, endX, gap, quantity) {
    let currentY = midCanvasY - quantity * gap / 4;
    let currentX = startX;
    cx.beginPath();
    cx.moveTo(startX, currentY);

    for (let i = 0; i < quantity; i++) {
        currentX = currentX === startX ? endX: startX;
        currentY += gap / 2;
        cx.lineTo(currentX, currentY);
    }

    cx.stroke();
}

drawZigzaggingLine(200, 300, 20, 8);


// A SPIRAL MADE UP OF 100 STRAIGHT LINE SEGMENTS
function drawSpiral(centerX) {
    cx.beginPath();
    cx.moveTo(centerX, midCanvasY);

    for (let i = 0; i < 100; i++) {
        cx.lineTo(centerX + (Math.cos(i / 5) * i / 2), midCanvasY + (Math.sin(i / 5) * i / 2 ));
    }

    cx.stroke();
}

drawSpiral(400);


// A YELLOW STAR
function drawStar(centerX, size) {
    cx.beginPath();
    cx.moveTo(centerX + size, midCanvasY);

    const circlePos = [[Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)], 
                       [Math.cos(Math.PI / 2), Math.sin(Math.PI / 2)],
                       [- Math.cos(Math.PI /4), Math.sin(Math.PI /4)],
                       [Math.cos(Math.PI), Math.sin(Math.PI)],
                       [- Math.cos(Math.PI / 4), - Math.sin(Math.PI / 4)],
                       [- Math.cos(Math.PI / 2), - Math.sin(Math.PI / 2)],
                       [Math.cos(Math.PI / 4), - Math.sin(Math.PI / 4)],
                       [Math.cos(0), Math.sin(0)]]

    circlePos.forEach(position => {
        let x = centerX + position[0] * size;
        let y = midCanvasY + position[1] * size;
        cx.quadraticCurveTo(centerX, midCanvasY, x ,y);
    });

    cx.fillStyle = "orange";
    cx.fill();
    cx.strokeStyle = "orange";
    cx.stroke();
}

drawStar(550, 50);
