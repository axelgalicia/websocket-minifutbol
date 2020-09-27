const field = document.getElementById('field');
const ball = document.getElementById('ball');
const HIT_UP_CLASS = 'hit-up';
const HIT_DOWN_CLASS = 'hit-down';
const HIT_LEFT_CLASS = 'hit-left';
const HIT_RIGHT_CLASS = 'hit-right';


dragElementHandler(ball);

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