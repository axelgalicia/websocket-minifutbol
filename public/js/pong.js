
import { Game } from './game.js';

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

// Board Setup
const GAME_WIDTH = canvas.width;
const GAME_HEIGTH = canvas.height;


const game = new Game(GAME_WIDTH, GAME_HEIGTH);
game.start(ctx);


let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGTH);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);