//Socket.IO
const socket = io.connect('http://localhost:4000');

const field = document.getElementById('field');
const ball = document.getElementById('ball');

const outOfBoundX = 30;
const outOfBoundY = 30;

const HIT_UP_CLASS = 'hit-up';
const HIT_DOWN_CLASS = 'hit-down';
const HIT_LEFT_CLASS = 'hit-left';
const HIT_RIGHT_CLASS = 'hit-right';


function sendCoordinates(newX, newY, isOut) {
    socket.emit('coordinates', {
        x: newX,
        y: newY,
        isOut
    });
}


function listenForBroadcas() {
    socket.on('coordinates-broadcast', (data) => {
       // console.log(data);
        if (data.isOut) {
            startBall();
        } else {
            ball.style.top = data.y + 'px';
            ball.style.left = data.x + 'px';
        }
    });
}


dragElementHandler(ball);
listenForBroadcas();

function hitBall(initialX, newX, initialY, newY) {

    let hitDirectionClassX;
    let hitDirectionClassY;

    // RIGHT
    if (initialX < newX) {
        hitDirectionClassX = HIT_RIGHT_CLASS;
    } else { // LEFT
        hitDirectionClassX = HIT_LEFT_CLASS;
    }

    // DOWN
    if (initialY < newY) {
        hitDirectionClassY = HIT_DOWN_CLASS;
    } else { // UP
        hitDirectionClassY = HIT_UP_CLASS;
    }

    addClass(ball, hitDirectionClassX);
    addClass(ball, hitDirectionClassY);

    setTimeout(() => {
        removeClass(ball, hitDirectionClassX);
        removeClass(ball, hitDirectionClassY);
    }, 1000);

    verifyBallBoundary(newX, newY);
}

function verifyBallBoundary(newX, newY) {
    // console.log('x:', newX, 'y:',newY, 'fieldX:', field.clientWidth, 'fieldY:', field.clientHeight)
    let isOut = false;

    if (isPortrait()) {
        if (newX > field.clientWidth + 50 || newX < outOfBoundX) {
            isOut = true;
        }

        if (newY > field.clientHeight + 50 || newY < outOfBoundY) {
            isOut = true;
        }
    } else {
        if (newX > field.clientWidth + 50 || newX < outOfBoundX) {
            isOut = true;
        }

        if (newY > field.clientHeight + 5 || newY < outOfBoundY) {
            isOut = true;
        }
    }
    if (isOut) {
        startBall();
        sendCoordinates(0, 0, true);
    } else {
        sendCoordinates(newX, newY, false);
    }

   
}

function startBall() {
    ball.style.top = 'calc(50% - 15px)';
    ball.style.left = 'calc(50% - 18px)';
}

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function dragElementHandler(elmnt) {
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    elmnt.onmousedown = dragStart;
    elmnt.ontouchstart = dragStart;

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            document.addEventListener('touchend', closeDragElement, { passive: false });
            document.addEventListener('touchmove', elementDrag, { passive: false });

        } else {
            // get the mouse cursor position at startup:
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        let newX = 0;
        let newY = 0;
        if (e.type === 'touchmove') {
            newX = e.touches[0].clientX;
            newY = e.touches[0].clientY;
            currentX = initialX - newX;
            currentY = initialY - newY;
        } else {
            newX = e.clientX;
            newY = e.clientY;
            currentX = initialX - newX;
            currentY = initialY - newY;
        }

        hitBall(initialX, newX, initialY, newY);
        initialX = newX;
        initialY = newY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - currentY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - currentX) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // Mobile
        document.ontouchend = null;
        document.ontouchmove = null;
        document.removeEventListener('touchend', closeDragElement, { passive: false })
        document.removeEventListener('touchmove', elementDrag, { passive: false })
    }
}

function isPortrait() {
    return window.innerHeight > window.innerWidth;
}

function isLandscape() {
    return (window.orientation === 90 || window.orientation === -90);
}