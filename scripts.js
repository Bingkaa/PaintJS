var isDrawing = false;
var c = document.getElementById("canvas");
var canvas = c.getContext("2d");
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

// Set canvas size based on window size
function setCanvasSize() {
    c.width = window.innerWidth * 0.9; // Adjust as needed
    c.height = window.innerHeight * 0.6; // Adjust as needed
}

// Function to handle touch start
function handleTouchStart(event) {
    event.preventDefault(); // Prevent default touch behavior
    startDrawing(event.touches[0]); // Pass the first touch event to startDrawing function
}

// Draw on Canvas
function draw() {
    setCanvasSize(); // Set initial canvas size
    window.addEventListener("resize", setCanvasSize); // Update canvas size on window resize

    c.addEventListener("mousedown", startDrawing);
    c.addEventListener("touchstart", handleTouchStart, { passive: false }); // Prevent default touch behavior
    c.addEventListener("mousemove", brush);
    c.addEventListener("touchmove", brush, { passive: false }); // Prevent default touch behavior
    c.addEventListener("mouseup", endDrawing);
    c.addEventListener("touchend", endDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop];
}

function brush(e) {
    if (!isDrawing) return;
    var xPos, yPos;
    if (e.touches) {
        xPos = e.touches[0].pageX - this.offsetLeft;
        yPos = e.touches[0].pageY - this.offsetTop;
    } else {
        xPos = e.pageX - this.offsetLeft;
        yPos = e.pageY - this.offsetTop;
    }

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
    canvas.clearRect(0, 0, c.width, c.height); // Clear the entire canvas
}

window.addEventListener("load", draw);
