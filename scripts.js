var isDrawing = false;
var c = document.getElementById("canvas");
canvas = c.getContext("2d");
var color = "black";

// Styling for color buttons
var colors = document.getElementById("color").childNodes;
var current_color = 1;

for (let i = 0; i < colors.length; i++) {
    if (i % 2 != 0) {
        colors[i].style.backgroundColor = colors[i].id;
    }
}

colors[1].classList.add('active');

// Draw on Canvas
function draw() {
    c.addEventListener("mousedown", startDrawing);
    c.addEventListener("mousemove", brush);
    c.addEventListener("mouseup", endDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop];
}

function brush(e) {
    if (!isDrawing) return;
    var xPos = e.pageX - this.offsetLeft;
    var yPos = e.pageY - this.offsetTop;

    drawLine(lastX, lastY, xPos, yPos);

    lastX = xPos;
    lastY = yPos;
}

function endDrawing() {
    isDrawing = false;
}

function drawLine(x1, y1, x2, y2) {
    canvas.beginPath();
    canvas.strokeStyle = color;
    canvas.lineWidth = 10;
    canvas.lineJoin =  "round";
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.closePath();
    canvas.stroke();
}

function changeColor(newColor) {
    color = newColor;

    // Removes box shadow
    for (var i = 0; i < colors.length; i++) {
        if (i % 2 != 0) {
            colors[i].classList.remove('active');

            if (colors[i].id == color) {
                colors[i].classList.add('active');
            }
        }
    }
}

function clearCanvas() {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
}

window.addEventListener("load", draw);