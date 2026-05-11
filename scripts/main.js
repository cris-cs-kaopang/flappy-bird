// get the canvas element from HTML
const canvas = document.getElementById("myCanvas");

// get the drawing tool
const ctx = canvas.getContext("2d");


// BIRD START POSITION
let birdX = 100;
let birdY = 275;


// bird falling speed
let velocity = 0;


// gravity strength
let gravity = 0.5;


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

  // update movement
  update();

  // draw bird again
  drawBird();

  // repeat forever
  requestAnimationFrame(gameLoop);

}


// start the game loop
gameLoop();