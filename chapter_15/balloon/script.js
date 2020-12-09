/* Write a page that displays a balloon (using the balloon emoji, 🎈). When you
press the up arrow, it should inflate (grow) 10 percent, and when you press the 
down arrow, it should deflate (shrink) 10 percent.

When that works, add a feature where, if you blow up the balloon past a certain
size, it explodes. In this case, exploding means that it is replaced with an 💥 
emoji, and the event handler is removed (so that you can’t inflate or deflate 
the explosion). */


const balloon = document.querySelector("p");
const BOOM_VALUE = 160;

function resizeBalloon(e) {
    let currentSize = window.getComputedStyle(balloon).fontSize;
    currentSize = Number(currentSize.replace("px", ""));
    
    if (e.key === "ArrowUp") {
        e.preventDefault();
        currentSize *= 1.1;
    }
    else if (e.key === "ArrowDown" && currentSize > 16) {
        e.preventDefault();
        currentSize *= 0.9;
    } 
   
    if (currentSize > BOOM_VALUE) {
        balloon.textContent = "💥";
        document.removeEventListener("keydown", resizeBalloon);
    } 
        
    balloon.style.fontSize = `${currentSize}px`;
}


document.addEventListener("keydown", resizeBalloon);