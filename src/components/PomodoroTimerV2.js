import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;

const timerProps = {
  size: 200,
  strokeWidth: 10,
};

const renderTime = (dimension, time) => {
  // Check if 'time' is a number to avoid NaN display
  if (typeof time === "number") {
    const minutes = Math.floor(time / minuteSeconds);
    const seconds = time % minuteSeconds;
    return (
      <div className="time-wrapper">
        <div className="time">{`${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`}</div>
        <div>{dimension}</div>
      </div>
    );
  }
  // If 'time' is not a number, return a placeholder or loading state
  return <div className="time-wrapper">Loading...</div>;
};

export const PomodoroTimerV2 = () => {
  const pomodoroTime = 25 * minuteSeconds;
  const shortBreakTime = 5 * minuteSeconds;

  const [key, setKey] = useState(0);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  // Start the timer
  const startTimer = () => {
    setIsPlaying(true);
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsPlaying(false);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsPlaying(false); // Stop the timer
    setKey((prevKey) => prevKey + 1); // Increment key to reset the timer
  };

  // Function to handle completion of the timer
  const onComplete = () => {
    // Switch between work and break times
    setIsWorkTime(!isWorkTime);
    // Increment key to reset the timer
    setKey((prevKey) => prevKey + 1);
    // Continue the timer without delay
    return { shouldRepeat: true, delay: 0 };
  };

  const duration = isWorkTime ? pomodoroTime : shortBreakTime;
  const color = isWorkTime ? "#ff5945" : "#218380";

  return (
    <div className="pomodoro-timer-container2">
      <div className="timer-display">
        <CountdownCircleTimer
          className="timer-display"
          isPlaying={isPlaying}
          {...timerProps}
          colors={color}
          duration={duration}
          key={key}
          onComplete={onComplete}
        >
          {({ elapsedTime }) =>
            elapsedTime !== undefined
              ? renderTime("", duration - Math.floor(elapsedTime))
              : renderTime("", duration)
          }
        </CountdownCircleTimer>
      </div>

      <div className="timer-title">
        {" "}
        {isWorkTime ? "Work Time" : "Break Time"}
      </div>

      <button className="timer-btn" onClick={startTimer}>
        Start
      </button>
      <button className="timer-btn" onClick={pauseTimer}>
        Pause
      </button>
      <button className="timer-btn" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};
