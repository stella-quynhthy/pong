
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
//Paddle Collisions (left - plyr1; right = plyr2)
        if (this.x-this.radius < p1.x+p1.width && this.y > p1.y && this.y < p1.y+p1.height){
            this.dx*-1;
            this.x = p1.x+p1.width+this.radius;
        };
        if (this.x+this.radius > p2.x && this.y > p2.y && this.y < p2.y+p2.height) {
            this.dx*-1;
            this.x = p2.x-this.radius;
        };
        if (this.x < 0){
            plyrTwoScore+=1;
            checkWinner();
            resetRound();
        };
        if (this.x>canvas.width){
            plyrOneScore+=1;
            checkWinner();
            resetRound();
        };
    };
};

/* STEP 4: Create Paddle class */
/* Define a class for paddles */
class Paddle {
/* Constructor sets position, size, and movement speed */
    constructor(x){
        this.x = x;
        this.y = canvas.height/2-30;
        this.width = 20;
        this.height = 60;
        this.speed = 12;
        this.up = false;
        this.down = false;
    };

/* Draw method: renders rectangle paddle */
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x,this.y, this.width, this.height);
        ctx.closePath();
    };

/* Update method: handles player input or AI movement */
    update(isAi = false, ball = null){
        if (isAi && ball) {
            if (ball.y < this.y+this.height/2) {
                this.y-=this.speed*0.7;
            } else {
                this.y+=this.speed*0.7;
            };
        } else {
            if (this.up) {
                this.y-=this.speed;
            } 
            if (this.down) {   
                this.y+=this.speed;
            };
        };
        /* Clamp movement so paddle stays inside screen */
        if (this.y < 0) {
            this.y = 0;
        };
        if (this.y+this.height > canvas.height) {
            this.y = canvas.height-this.height;
        };
    };
};

/* STEP 5: Create game objects */
/* Create ball instance */
let ballInstance
/* Create Player 1 paddle (left side) */
let plyr1
/* Create Player 2 paddle (right side) */
let plyr2


/* STEP 6: Handle keyboard input */
/* Listen for key press events */
document.addEventListener("keydown", (e) => {
    /* W key = move Player 1 up */
    if (e.key = "w") {
        plyr1.up = true;
    };
    /* S key = move Player 1 down */
    if (e.key = "s") {
        plyr1.down = true;
    };
    /* Arrow keys = move Player 2 (only in 2-player mode) */
    if (aiMode = false) {
        if (e.key = "ArrowUp") {
            plyr2.up = true;
        };
        if (e.key = "ArrowDown") {
            plyr2.down = true;
        };
    };
    /* Space = start game */
    if (e.key = " ") {
        //call on startGame()
    };
});

/* Listen for key release events to stop movement */
document.addEventListener("keyup", (e) => {
    /* W key = move Player 1 up */
    if (e.key = "w") {
        plyr1.up = false;
    };
    /* S key = move Player 1 down */
    if (e.key = "s") {
        plyr1.down = false;
    };
    /* Arrow keys = move Player 2 (only in 2-player mode) */
    if (aiMode = false) {
        if (e.key = "ArrowUp") {
            plyr2.up = false;
        };
        if (e.key = "ArrowDown") {
            plyr2.down = false;
        };
    };
});


/* STEP 7: Reset round function */
function resetRound() {
    /* Reset ball position */
    ball.reset();
    /* Reset both paddles to center */
    plyr1.y = canvas.height/2-30;
    plyr2.y = canvas.height/2-30;
    /* Used after every point scored */
}



/* STEP 8: Check winner function */
function checkWinner() {
    /* If Player 1 reaches winning score → stop game */
    if (plyrOneScore >= winningScore) {
        message.textContent = "Player 1 WINS :)"
    };
    /* If Player 2 or AI reaches winning score → stop game */
    if (plyrTwoScore >= winningScore) {
        message.textContent = aiMode ?"AI WINS :)":"Player 2 WINS :)";
    };
    /* Show win message */
};



/* STEP 9: Game loop function */
function gameLoop() {
    /* Stop loop if game is not running */
    if (!isRunning) {
        return;
    };
    /* Clear canvas every frame */
    ctx.clearRect(0,0,canvas.width,canvas.height);
    /* Update paddle positions */
    plyr1.update();
    plyr2.update(aiMode, ball);
    /* Update ball position */
    ball.update(plyr1, plyr2);
    /* Draw everything on screen */
    plyr1.draw();
    plyr2.draw();
    ball.draw();
    /* Update score display */
    plyrOneScoreDisplay.textContent = plyrOneScore;
    plyrTwoScoreDisplay.textContent = plyrTwoScore;
    /* Repeat loop using requestAnimationFrame */
    animFrameId = requestAnimationFrame(loop);
}



/* STEP 10: Start game function */
function startGame() {
    cancelAnimationFrame(animFrameId);
    /* Reset scores to 0 */
    plyrOneScore = 0;
    plyrTwoScore = 0;
    /* Set game to running */
    isRunning = true;
    /* Create new ball */
    ball = new Ball;
    /* Create new paddles */
    plyr1 = new Paddle(10);
    plyr2 = new Paddle(canvas.width-20);
    /* Update UI message */
    updateModeUi();
    /* Start game loop */
    message.textContent = "First to 10 WINS!";
    gameLoop();
};


/* STEP 11: Toggle AI vs 2 Player mode */
/* Listen for button click */
/* Switch AI mode ON/OFF */
/* Update button text */
/* Update message display */
function updateModeUi() {
    if (aiMode) {
        toggleBtn.textContent = "Mode: AI"
        message.textContent = "You Are Playing Against AI";
    } else {
        toggleBtn.textContent = "Mode: 2-Player"
        message.textContent = "This is 2-Player Mode";
    };
}


/* STEP 12: Restart game */
/* Listen for restart button click */
/* Call start game function */


/* STEP 13: Initialize game */
/* Start game automatically when page loads */