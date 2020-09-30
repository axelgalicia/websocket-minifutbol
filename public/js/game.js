import { Paddle, PLAYER } from './paddle.js';
import { InputHandler } from './input.js';
import { Ball } from './ball.js';

export class Game {


    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ball = null;
        this.paddle1 = null;
        this.paddle2 = null;
        this.allObjects = [];

    }

    start(ctx) {
        // Ball
        this.ball = new Ball(this);

        // Players Setup
        this.paddle1 = new Paddle(this, PLAYER.ONE);
        const inpuntHandlerPaddle1 = new InputHandler(this.paddle1);
        this.paddle1.draw(ctx);

        this.paddle2 = new Paddle(this, PLAYER.TWO);
        const inputHandlerPaddle2 = new InputHandler(this.paddle2);
        this.paddle2.draw(ctx);

        this.allObjects = [this.ball, this.paddle1, this.paddle2];

    }

    update(deltaTime) {
        this.allObjects.map(obj => obj.update(deltaTime));
    }


    draw(ctx) {
        this.allObjects.map(obj => obj.draw(ctx));
        ctx.font = "30px Arial";
        ctx.fillStyle = '#00a';
        ctx.fillText("" + this.paddle1.score, this.gameWidth / 2 - 5, this.gameHeight / 2 - 100);
        ctx.fillStyle = '#0a0';
        ctx.fillText("" + this.paddle2.score, this.gameWidth / 2 - 5, this.gameHeight / 2 + 100);
    }
}