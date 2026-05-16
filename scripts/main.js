// get the canvas element from HTML
const canvas = document.getElementById("myCanvas");

// get the drawing tool
const ctx = canvas.getContext("2d");

const pipeWidth = 50;
let topPipeHeight = Math.random() * 200 + 100; // Top pipe: 100-300
const gap = 180; // Gap between pipes
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

  // update bird movement
  update();

  // draw moving pipes
  drawPipe();

  // draw bird
  drawBird();

  // Check for collisions
  if (collisionDetection()) {
      alert("Game Over!");
      return; // Stop the game loop
  }

  // repeat forever
  requestAnimationFrame(gameLoop);

}


// spacebar jump strength
let lift = -8;


// listen for keyboard input
document.addEventListener("keydown", function(event) {

  // check if spacebar is pressed
  if (event.code === "Space") {

    // make bird jump upward
    velocity = lift;

  }

});

// Collison Detection
function collisionDetection(pipe, bird) {
    return(
        // Top Pipe
        birdX < x + pipeWidth &&
        birdX + 40 > x &&
        birdY < 0 + topPipeHeight &&
        birdY + 40 > 0

        // Bottom Pipe
        || birdX < x + pipeWidth &&
           birdX + 40 > x &&
           birdY < canvas.height &&
           birdY + 40 > canvas.height - bottomPipeHeight

        // Ground Collision
        || birdY + 40 > canvas.height

        // Ceiling Collision
        || birdY < 0
      );
}



// start button
const runButton = document.getElementById("runButton");

runButton.addEventListener("click", () => {

  // start the game
  gameLoop();

  // disable button after clicking
  runButton.disabled = true;

});