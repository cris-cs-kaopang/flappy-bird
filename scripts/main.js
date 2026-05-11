// get the canvas element from HTML
const canvas = document.getElementById("myCanvas");

// get the drawing tool
const ctx = canvas.getContext("2d");

const pipeWidth = 50;
let topPipeHeight = Math.random() * 200 + 100; // Top pipe: 100-300
const gap = 150; // Gap between pipes
let bottomPipeHeight = canvas.height - gap - topPipeHeight; // Bottom pipe adjusts to fit
const pipeSpeed = 3;
let x = canvas.width;


// BIRD START POSITION
let birdX = 100;
let birdY = 275;
// bird falling speed
let velocity = 0;
// gravity strength
let gravity = 0.5;

// Draws pipes
function drawPipe() {
    // Top pipe
    ctx.beginPath();
    ctx.rect(x, 0, pipeWidth, topPipeHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    // Bottom pipe
    ctx.beginPath();
    ctx.rect(x, canvas.height - bottomPipeHeight, pipeWidth, bottomPipeHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    x -= pipeSpeed;
    if (x + pipeWidth < 0) {
        // Reset pipe to the right
        x = canvas.width;
        topPipeHeight = Math.random() * 200 + 100; // Randomize top pipe
        bottomPipeHeight = canvas.height - gap - topPipeHeight; // Adjust bottom
    }
}

// draw bird
function drawBird() {

  // bird color
  ctx.fillStyle = "yellow";

  // draw bird rectangle
  ctx.fillRect(birdX, birdY, 40, 40);

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPipe();

    requestAnimationFrame(draw);
}

// Starts the game
function startGame() {
    draw();
}

// Button to start the game
const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
});

// movement
function update() {

  // increase falling speed
  velocity += gravity;

  // move bird downward
  birdY += velocity;
}

// GAME LOOP
function gameLoop() {

  // clear old frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update movement
  update();

  // draw bird again
  drawBird();

  // repeat forever
  requestAnimationFrame(gameLoop);

}

// start the game loop
gameLoop();
