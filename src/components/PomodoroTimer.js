import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  // Define the default work time and break time in minutes
  const workTime = 25;
  const breakTime = 5;

  // States for minutes, seconds, and a flag to indicate if the timer is running
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Start the timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  // Reset the timer to the initial state
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(workTime);
    setSeconds(0);
  };

  // Effect to handle the countdown
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        // Decrement seconds, and handle minute and second reset logic
        setSeconds((seconds) => {
          if (seconds === 0) {
            setMinutes((minutes) => {
              if (minutes === 0) {
                // Time's up, could switch to break time or reset
                pauseTimer(); // Or setMinutes(breakTime) to start the break
                return workTime; // Reset to work time for the next session
              } else {
                return minutes - 1;
              }
            });
            return 59;
          } else {
            return seconds - 1;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="pomodoro-timer-container">
      <div className="pomodoro-timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button className="timer-btn" onClick={startTimer}>Start</button>
      <button className="timer-btn" onClick={pauseTimer}>Pause</button>
      <button className="timer-btn" onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
