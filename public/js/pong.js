const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
import { Paddle, PLAYER } from './paddle.js';

// Board Setup
const GAME_WIDTH = canvas.width;
const GAME_HEIGTH = canvas.height;


// Players Setup
let paddle1 = new Paddle(GAME_WIDTH, GAME_HEIGTH, PLAYER.ONE);
paddle1.draw(ctx);

let paddle2 = new Paddle(GAME_WIDTH, GAME_HEIGTH, PLAYER.TWO);
paddle2.draw(ctx);
