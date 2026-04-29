
/* STEP 1: Get elements from the page */
/* Select the canvas element */
const gameArea = document.getElementById("gameArea");
/* Get the drawing context (2D graphics engine) */
const ctx = canvas.getContext("2d");
/* Get score display elements */
const plyrOneScoreDisplay = document.getElementById("pOne");
const plyrTwoScoreDisplay = document.getElementById("pTwo");
/* Get message display element */
const message = document.getElementById("message");
/* Get restart and mode toggle buttons */
const restartBtn = document.getElementById("restart");
const toggleBtn = document.getElementById("toggle");

/* STEP 2: Create game state variables */
/* Store Player 1 score */
let plyrOneScore = 0;
/* Store Player 2 score */
let plyrTwoScore = 0;
/* Track if game is running */
let isRunning = false;
/* Store animation frame ID */
let animFrameId
/* Set winning score limit */
const winningScore = 10;
/* Store whether AI mode is ON or OFF */
let aiMode = false;


/* STEP 3: Create Ball class */
class Ball {
/* Define a class for the ball object */
    constructor() {
        this.reset()
    }
/* Constructor sets starting position and speed */
/* Reset method: places ball in center and random direction */

    reset() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 7;
        this.dx = 4*(Math.random() > 0.5?1:-1);
        this.dy = 3;
    };
/* Draw method: renders circle on canvas */

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath;
        ctx.arch(this.x, this.y, this.radius, 0, Maht.PI*2);
        ctx.fill();
    };
/* Update method: moves ball and checks wall collisions */

    update(p1, p2) {
        this.x+=this.dx;
        this.y+=this.dy;
//Wall Collisions
        if (this.y+this.radius > canvas.height || this.y-this.radius < 0) {
            this.dy*-1;
        };
//Paddle Collisions (left - plry1; right = plry2)
        if (this.x-this.radius < p1.x+p1.width && this.y > p1.y && this.y < p1.y+p1.height){
            this.dx*-1;
            this.x = p1.x+p1.width+this.radius;
        };
        if (this.x+this.radius > p2.x && this.y > p2.y && this.y < p2.y+p2.height) {
            this.dx*-1;
            this.x = p2.x-this.radius;
        };
    }
}

/* STEP 4: Create Paddle class */
/* Define a class for paddles */
/* Constructor sets position, size, and movement speed */
/* Draw method: renders rectangle paddle */
/* Update method: handles player input or AI movement */
/* Clamp movement so paddle stays inside screen */


/* STEP 5: Create game objects */
/* Create ball instance */
/* Create Player 1 paddle (left side) */
/* Create Player 2 paddle (right side) */


/* STEP 6: Handle keyboard input */
/* Listen for key press events */
/* W key = move Player 1 up */
/* S key = move Player 1 down */
/* Arrow keys = move Player 2 (only in 2-player mode) */
/* Space = start game */
/* Listen for key release events to stop movement */


/* STEP 7: Reset round function */
/* Reset ball position */
/* Reset both paddles to center */
/* Used after every point scored */


/* STEP 8: Check winner function */
/* If Player 1 reaches winning score → stop game */
/* If Player 2 or AI reaches winning score → stop game */
/* Show win message */


/* STEP 9: Game loop function */
/* Stop loop if game is not running */
/* Clear canvas every frame */
/* Update paddle positions */
/* Update ball position */
/* Check collisions between ball and paddles */
/* Draw everything on screen */
/* Update score display */
/* Repeat loop using requestAnimationFrame */


/* STEP 10: Start game function */
/* Reset scores to 0 */
/* Set game to running */
/* Create new ball */
/* Create new paddles */
/* Update UI message */
/* Start game loop */


/* STEP 11: Toggle AI vs 2 Player mode */
/* Listen for button click */
/* Switch AI mode ON/OFF */
/* Update button text */
/* Update message display */


/* STEP 12: Restart game */
/* Listen for restart button click */
/* Call start game function */


/* STEP 13: Initialize game */
/* Start game automatically when page loads */