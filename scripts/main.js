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

let pipeImg = new Image();
pipeImg.src = "./images/unnamed.png";

 function drawPipe() {

    // TOP PIPE
    ctx.save();

    ctx.translate(x + pipeWidth / 2, topPipeHeight / 2);
    ctx.rotate(Math.PI);

    ctx.drawImage(
        pipeImg,
        -pipeWidth / 2,
        -topPipeHeight / 2,
        pipeWidth,
        topPipeHeight
    );

    ctx.restore();

    // BOTTOM PIPE
    ctx.drawImage(
        pipeImg,
        x,
        canvas.height - bottomPipeHeight,
        pipeWidth,
        bottomPipeHeight
    );

    x -= pipeSpeed;

    if (x + pipeWidth < 0) {

        x = canvas.width;
        topPipeHeight = Math.random() * 200 + 150;
        bottomPipeHeight = canvas.height - gap - topPipeHeight;

        passedPipe = false;
    }
}

let birdImg = new Image();
birdImg.src = "./images/1.png";

function drawBird() {

    ctx.drawImage(birdImg, birdX, birdY, 80, 80);

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

  // draw score
  drawScore();

  // update score
  updateScore();

  // Check for collisions
  if (collisionDetection()) {
      endGame();
      return; // Stop the game loop
  }

  // repeat forever
  requestAnimationFrame(gameLoop);

}


// spacebar jump strength
let lift = -8;


let jumpSound = new Audio("sounds/sound-a.mp3");

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        jumpSound.play();

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

/// Score system
let score = 0;
// Track if the bird has passed the current pipe
let passedPipe = false;

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function updateScore() {
  // check if bird passed the pipe
  if (birdX > x + pipeWidth && passedPipe === false) {
    // add score
    score++;
    // stop multiple scoring
    passedPipe = true;
  }
}

// High score tracking
let highScore = localStorage.getItem('highScore') || 0;

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}

// Call this function when the game ends
function endGame() {
  updateHighScore();
  alert(
  `Game Over!

  Your score: ${score}
  High Score: ${highScore}`
  );
}

// Initialize high score in local storage if not set
if (!localStorage.getItem('highScore')) {
  localStorage.setItem('highScore', 0);
}

// start button
const runButton = document.getElementById("runButton");

runButton.addEventListener("click", () => {

  // start the game
  gameLoop();

  // disable button after clicking
  runButton.disabled = true;

});