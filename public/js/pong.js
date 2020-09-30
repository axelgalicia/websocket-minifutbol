import { Paddle, PLAYER } from './paddle.js';
import { InputHandler } from './input.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

// Board Setup
const GAME_WIDTH = canvas.width;
const GAME_HEIGTH = canvas.height;


// Ball
const ball = new Ball(GAME_WIDTH, GAME_HEIGTH);

// Players Setup
let paddle1 = new Paddle(GAME_WIDTH, GAME_HEIGTH, PLAYER.ONE);
const inpuntHandlerPaddle1 = new InputHandler(paddle1);
paddle1.draw(ctx);

let paddle2 = new Paddle(GAME_WIDTH, GAME_HEIGTH, PLAYER.TWO);
const inputHandlerPaddle2 = new InputHandler(paddle2);
paddle2.draw(ctx);

// Game Loop

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGTH);

    paddle2.update(deltaTime);
    paddle2.draw(ctx);

    ball.update(deltaTime);
    ball.draw(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
