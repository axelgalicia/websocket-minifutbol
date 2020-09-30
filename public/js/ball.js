const ballSize = 25;
const ballSpeed = { x: 6, y: 5 };
const initialPosition = { x: 10, y: 10 };
const RIGTH = 0;
const LEFT = 1;

export class Ball {

    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.direction = RIGTH;
        this.image = document.getElementById('ball');
        this.speed = ballSpeed;
        this.size = ballSize;
        this.position = initialPosition;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        const { paddle1, paddle2 } = this.game;

        // Wall oon the left or right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // Wall on top or bottom        
        if (this.position.y + this.size > this.gameHeight) {
            this.speed.y = -this.speed.y;
            paddle1.score += 1;

        } else if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
            paddle2.score += 1;
        }


        // // check with paddles
        const topOfBall = this.position.y;
        const bottomOfBall = topOfBall + this.size;

        const bottomOfPaddle1 = paddle1.position.y + paddle1.height;

        const paddle2X1 = paddle2.position.x;
        const paddle2X2 = paddle2X1 + paddle2.width;

        const paddle1X1 = paddle1.position.x;
        const paddle1X2 = paddle1X1 + paddle1.width;

        const topOfPaddle2 = paddle2.position.y;

        // Paddle1 check
        if (topOfBall <=  bottomOfPaddle1 && this.position.x >= paddle1X1 && this.position.x <= paddle1X2) {
            console.log('paddle1:', bottomOfPaddle1, ' ball:', this.position.y);
            this.speed.y = -this.speed.y;
            this.position.y = paddle1.position.y + this.size;
        }

        // Paddle 2 check
        if (bottomOfBall >= topOfPaddle2 && this.position.x >= paddle2X1 && this.position.x <= paddle2X2) {
            console.log('paddle2:', topOfPaddle2, ' ball:', this.position.y);
            this.speed.y = -this.speed.y;
            this.position.y = paddle2.position.y - this.size;
        }

        console.log('P1:', paddle1.score, 'P2:', paddle2.score);
    }
}