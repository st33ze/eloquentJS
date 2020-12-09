/* In this exercise, I want you to implement a mouse trail. Use absolutely
positioned <div> elements with a fixed size and background color (refer to
the code in the “Mouse Clicks” section for an example). Create a bunch of 
such elements and, when the mouse moves, display them in the wake of the 
mouse pointer. */


const trailPoint = document.createElement("div");
trailPoint.className = "trail";
const currentPoints = [];

window.addEventListener("mousemove", showTrail);

function showTrail(event) {
    const newPoint = trailPoint.cloneNode();
    newPoint.style.left = (event.pageX - 3) + "px";
    newPoint.style.top = (event.pageY - 3) + "px";

    if (currentPoints.length === 5) {
        currentPoints.pop().remove();
    }
    
    // Change opacity.
    currentPoints.forEach(point => {
        const opacity = window.getComputedStyle(point).opacity;
        point.style.opacity = opacity - 0.2;
    })

    currentPoints.unshift(newPoint);
    document.body.appendChild(newPoint);    
}
