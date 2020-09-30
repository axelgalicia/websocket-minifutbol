const offsetFromBoard = 10;
const paddleWidth = 80;
const paddleHeight = 10;
const playerOneColor = '#00a';
const playerTwoColor = '#0a0';
const maxSpeed = 7;

export const PLAYER = {
    ONE: 1,
    TWO: 2
};

export class Paddle {

    constructor(gameWidth, gameHeight, playerNumber) {
        this.gameWidth = gameWidth;
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.playerNumber = playerNumber;
        this.maxSpeed = maxSpeed;
        this.speed = 0;

        this.position = {
            x: (gameWidth / 2) - (this.width / 2),
            y: playerNumber == PLAYER.ONE ?
                this.height - offsetFromBoard / 2 :
                gameHeight - this.height - offsetFromBoard,
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.playerNumber == PLAYER.ONE ? playerOneColor : playerTwoColor;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.speed;

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }


    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }
}