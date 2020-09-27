const offsetFromBoard = 10;
const paddleWidth = 120;
const paddleHeight = 15;
const playerOneColor = '#00a';
const playerTwoColor = '#0a0';

export const PLAYER = {
    ONE: 1,
    TWO: 2
};

export class Paddle {

    constructor(gameWidth, gameHeight, playerNumber) {
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.playerNumber = playerNumber;
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
}