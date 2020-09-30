const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

export class InputHandler {
    constructor(paddle) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case ARROW_LEFT:
                    paddle.moveLeft();
                    break;
                case ARROW_RIGHT:
                    paddle.moveRight();
                    break;
                default: return;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case ARROW_LEFT:
                    if (paddle.speed < 0) paddle.stop();
                    break;
                case ARROW_RIGHT:
                    if (paddle.speed > 0) paddle.stop();
                    break;
                default: return;
            }
        });
    }
}