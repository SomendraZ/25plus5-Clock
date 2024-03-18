document.addEventListener("DOMContentLoaded", function () {
  const breakDecrement = document.getElementById("break-decrement");
  const breakIncrement = document.getElementById("break-increment");
  const sessionDecrement = document.getElementById("session-decrement");
  const sessionIncrement = document.getElementById("session-increment");
  const startStopButton = document.getElementById("start_stop");
  const resetButton = document.getElementById("reset");
  const breakLength = document.getElementById("break-length");
  const sessionLength = document.getElementById("session-length");
  const timerLabel = document.getElementById("timer-label");
  const timeLeft = document.getElementById("time-left");
  const beep = document.getElementById("beep");

  let breakDuration = parseInt(breakLength.textContent);
  let sessionDuration = parseInt(sessionLength.textContent);
  let currentTime = sessionDuration * 60;
  let timer;
  let isRunning = false;
  let isSession = true;

  breakDecrement.addEventListener("click", function () {
    if (breakDuration > 1) {
      breakDuration--;
      breakLength.textContent = breakDuration;
    }
  });

  breakIncrement.addEventListener("click", function () {
    if (breakDuration < 60) {
      breakDuration++;
      breakLength.textContent = breakDuration;
    }
  });

  sessionDecrement.addEventListener("click", function () {
    if (sessionDuration > 1) {
      sessionDuration--;
      sessionLength.textContent = sessionDuration;
      timeLeft.textContent = `${sessionDuration}:00`;
      currentTime = sessionDuration * 60;
    }
  });

  sessionIncrement.addEventListener("click", function () {
    if (sessionDuration < 60) {
      sessionDuration++;
      sessionLength.textContent = sessionDuration;
      timeLeft.textContent = `${sessionDuration}:00`;
      currentTime = sessionDuration * 60;
    }
  });

  startStopButton.addEventListener("click", function () {
    if (!isRunning) {
      isRunning = true;
      startStopButton.textContent = "Stop";
      timer = setInterval(function () {
        currentTime--;
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        timeLeft.textContent = `${minutes}:${seconds}`;
        if (currentTime === 0) {
          clearInterval(timer);
          beep.play();
          if (isSession) {
            isSession = false;
            timerLabel.textContent = "Break";
            currentTime = breakDuration * 60;
            startStopButton.click();
          } else {
            isSession = true;
            timerLabel.textContent = "Session";
            currentTime = sessionDuration * 60;
            startStopButton.click();
          }
        }
      }, 1000);
    } else {
      isRunning = false;
      startStopButton.textContent = "Start";
      clearInterval(timer);
    }
  });

  resetButton.addEventListener("click", function () {
    clearInterval(timer);
    isRunning = false;
    isSession = true;
    breakDuration = 5;
    sessionDuration = 25;
    breakLength.textContent = breakDuration;
    sessionLength.textContent = sessionDuration;
    timerLabel.textContent = "Session";
    timeLeft.textContent = `${sessionDuration}:00`;
    startStopButton.textContent = "Start";
    currentTime = sessionDuration * 60;
    beep.pause();
    beep.currentTime = 0;
  });
});
