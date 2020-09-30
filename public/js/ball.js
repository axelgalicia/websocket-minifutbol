const ballSize = 25;
const ballSpeed = { x: 6, y: 5 };
const initialPosition = { x: 10, y: 10 };
const RIGTH = 0;
const LEFT = 1;

export class Ball {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.direction = RIGTH;
        this.image = document.getElementById('ball');
        this.speed = ballSpeed;
        this.position = initialPosition;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, ballSize, ballSize);
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + ballSize > this.gameWidth || this.position.x < 0) {
            console.log('X')
            this.speed.x = -this.speed.x;
        }

        if (this.position.y + ballSize > this.gameHeight || this.position.y < 0) {
            console.log('Y')
            this.speed.y = -this.speed.y;
        }


    }
}