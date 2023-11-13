import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

interface CountdownTimerProps {
  initialSeconds?: number;
  onTimerFinish?: () => void; // Callback function to be called when the timer finishes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 60 * 15,onTimerFinish

}) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      // Timer finished, call the callback function
      setIsActive(false);
      if (onTimerFinish) {
        onTimerFinish();
      }
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return (
    <div>
      <Typography variant="h3">Timer: {seconds} seconds</Typography>

      {/* <Button onClick={startTimer} disabled={isActive}>
        Start
      </Button>
      <Button onClick={stopTimer} disabled={!isActive}>
        Stop
      </Button>
      <Button onClick={resetTimer}>Reset</Button> */}
    </div>
  );
};

export default CountdownTimer;
