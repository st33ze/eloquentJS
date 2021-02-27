/* Earlier in the chapter, we saw an example program that drew a pie chart. 
Modify this program so that the name of each category is shown next to the 
slice that represents it. Try to find a pleasing-looking way to automatically 
position this text that would work for other data sets as well. You may assume 
that categories are big enough to leave ample room for their labels. */

const results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"} ];

let cx = document.querySelector("canvas").getContext("2d");
  let total = results.reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let centerX = 300, centerY = 150;

  // Add code to draw the slice labels in this loop.
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();

    // Add label.
    let labelCircMidX = Math.cos(currentAngle - sliceAngle / 2) * 100;
    let labelCircMidY = Math.sin(currentAngle - sliceAngle / 2) * 100;
    let startX = labelCircMidX > 0 ? labelCircMidX + 5: labelCircMidX - 60;
    startX += centerX;
    let startY = labelCircMidY > 0 ? labelCircMidY + 15: labelCircMidY - 15;
    startY += centerY;
    cx.font = "12px Sans-serif";
    cx.fillText(result.name, startX, startY);
  }
