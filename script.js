// declaring variables
var sessionCount = 1;
var countDownTime = document.querySelector('#countDownTime');
var sessionToBreakText = document.querySelector('#sessionToBreakText');
var sessionTime = document.querySelector('#sessionTime');
var breakTime = document.querySelector('#breakTime');
var sessionTimePlus = document.querySelector('#sessionTimePlus');
var sessionTimeMinus = document.querySelector('#sessionTimeMinus');
var breakTimePlus = document.querySelector('#breakTimePlus');
var breakTimeMinus = document.querySelector('#breakTimeMinus');
var startButton = document.querySelector('#startButton');
var resetButton = document.querySelector('#resetButton');

// session time
var sessionTimeMinutes = sessionTime.innerHTML;
sessionTimeMinutes = parseInt(sessionTimeMinutes.slice(0, 2));

// break time
var breakTimeMinutes = breakTime.innerHTML;
breakTimeMinutes = parseInt(breakTimeMinutes.slice(0, 2));

// adding event listeners
sessionTimePlus.addEventListener('click', increaseSessionTime);
sessionTimeMinus.addEventListener('click', decreaseSessionTime);
breakTimePlus.addEventListener('click', increaseBreakTime);
breakTimeMinus.addEventListener('click', decreaseBreakTime);
startButton.addEventListener('click', startClock, true);


function startClock() {

    // disabling buttons when start button is pressed
    sessionTimePlus.removeEventListener('click', increaseSessionTime);
    sessionTimeMinus.removeEventListener('click', decreaseSessionTime);
    breakTimePlus.removeEventListener('click', increaseBreakTime);
    breakTimeMinus.removeEventListener('click', decreaseBreakTime);
    startButton.removeEventListener('click', startClock, true);
    resetButton.addEventListener('click', resetTimer, true);

    // starting the timer
    var startSeTimer, startBrTimer;
    startSessionTimer(sessionTimeMinutes * 60, countDownTime);

    function startSessionTimer(duration, display) {

        var timer = duration, minutes, seconds;
        startSeTimer = setInterval(startSTimer, 1000);

        function startSTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.innerHTML = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(startSeTimer);
                startBreakTimer(breakTimeMinutes * 60, countDownTime);
            }
        }
    }

    function startBreakTimer(duration, display) {
        sessionToBreakText.innerHTML = "Break!";
        countDownTime.style.color = "#EB6841";
        document.querySelector('.top').style.borderColor = "#EB6841";

        var timer = duration, minutes, seconds;
        startBrTimer = setInterval(startBTimer, 1000);

        function startBTimer() {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerHTML = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }
    }

    function resetTimer() {
        sessionCount++;
        sessionToBreakText.innerHTML = "Session "+ sessionCount;
        countDownTime.style.color = "#00A0B0";
        document.querySelector('.top').style.borderColor = "#00A0B0";
        countDownTime.innerHTML = "00:00";
        clearInterval(startSeTimer);
        clearInterval(startBrTimer);
        resetButton.removeEventListener('click', resetTimer, true);

        // activating the event listeners again
        sessionTimePlus.addEventListener('click', increaseSessionTime);
        sessionTimeMinus.addEventListener('click', decreaseSessionTime);
        breakTimePlus.addEventListener('click', increaseBreakTime);
        breakTimeMinus.addEventListener('click', decreaseBreakTime);
        startButton.addEventListener('click', startClock, true);
    }
}

function increaseSessionTime() {
    sessionTimeMinutes += 1;
    sessionTime.innerHTML = sessionTimeMinutes + " min";
}

function decreaseSessionTime() {
    if (sessionTimeMinutes > 0)
        sessionTimeMinutes -= 1;
    else {
        alert("Session time can't be less than 0 minute.");
        sessionTimeMinutes=1;
    }
    sessionTime.innerHTML = sessionTimeMinutes + " min";
}

function increaseBreakTime() {
    breakTimeMinutes += 1;
    breakTime.innerHTML = breakTimeMinutes + " min";
}

function decreaseBreakTime() {
    if (breakTimeMinutes > 0)
        breakTimeMinutes -= 1;
    else {
        alert("Break time can't be less than 0 minute.");
    }
    breakTime.innerHTML = breakTimeMinutes + " min";
}