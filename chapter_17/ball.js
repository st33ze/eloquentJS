/* Use the requestAnimationFrame technique that we saw in Chapter 14 and
Chapter 16 to draw a box with a bouncing ball in it. The ball moves at a
constant speed and bounces off the box’s sides when it hits them. */

const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

const speed = 60;
const radius = 40;
let dx = (Math.random() < 0.5 ? -1: 1) * speed; 
let dy = (Math.random() < 0.5 ? -1: 1) * speed;
let posX = Math.floor(Math.random() * (canvas.width - radius - radius + 1) + radius);
let posY = Math.floor(Math.random() * (canvas.height - radius - radius + 1) + radius);

let lastTime = null;
function frame(time) {
    if (lastTime != null) {
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step) {
    cx.clearRect(0, 0, canvas.width, canvas.height);

    if (posX + dx * step > canvas.width - radius || posX + dx * step < radius)
        dx = -dx;
    if (posY + dy * step > canvas.width - radius || posY + dy * step < radius)
        dy = -dy;
    posX += dx * step;
    posY += dy * step;
    
    cx.beginPath();
    cx.arc(posX, posY, radius, 0, 7);
    cx.fillStyle = "purple";
    cx.fill();
    cx.stroke();
}