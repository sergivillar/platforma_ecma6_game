const ARROW_CODES = {
    37: 'left',
    38: 'up',
    39: 'right'
}
let arrows = trackKeys(ARROW_CODES);

function trackKeys (keyCodes) {
    let pressedKeys = {};
    function handler (event) {
        if (keyCodes.hasOwnProperty(event.keyCode)) {
            let downPressed = event.type === 'keydown';
            pressedKeys[keyCodes[event.keyCode]] = downPressed;
            event.preventDefault();
        }
    }
    addEventListener('keydown', handler);
    addEventListener('keyup', handler);

    return pressedKeys;
}

function runAnimation (frameFunction) {
    let lastTime = null;
    function frame (time) {
        let stop = false;
        if (lastTime !== null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000
            stop = frameFunction(timeStep) === false;
        }
        lastTime = time;
        if (!stop) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function runLevel (level, Display, callback) {
    let display = new Display(document.body, level);
    runAnimation(function (step) {
        level.animate(step, arrows);
        display.drawFrame();
        if (level.isFinshed()) {
            display.clear();
            if (callback) callback(level.status);
            return false;
        }
    })
}

function runGame (level, Display) {
    let levelObject = new Level(GAME_LEVELS);
    runLevel(levelObject, Display, status => {
        if (status === 'lost') console.log('Has perdidos');
        else console.log('Has ganado !!!');
    });
}

runGame(GAME_LEVELS, DOMDisplay);