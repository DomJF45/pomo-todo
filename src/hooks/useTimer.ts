import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { tick, start, stop, move, init } from "../features/timer/timerSlice";
import { BUTTON_PRESS, END_TIMER } from "../utils/constants";
import { updateTitle } from "../utils/updateTitle";

const buttonPress = new Audio(BUTTON_PRESS);
const endTimer = new Audio(END_TIMER);

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const { time, formattedTime, status } = useAppSelector(
    (state) => state.timer
  );

  // init timer on each cycle change
  const initTimer = (timer: string) => {
    dispatch(init(timer));
  };

  // make sound playable on all clicks
  const handlePressSound = () => {
    buttonPress.paused ? buttonPress.play() : (buttonPress.currentTime = 0);
  };

  // starts the timer
  const startTimer = () => {
    dispatch(start());
    handlePressSound();
  };

  // stops the timer
  const stopTimer = () => {
    dispatch(stop());
    handlePressSound();
  };

  // finishes and moves timer based on status
  const playFinish = useCallback(() => {
    dispatch(move());
    endTimer.play();
  }, [dispatch]);

  // handles tick cycles
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(tick());
    }, 1000);

    // check if the timer is done, play finish tone
    if (time <= 0) {
      playFinish();
    }

    // update the document title
    updateTitle(formattedTime, status);

    // clean up and clear interval id
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, playFinish, time, formattedTime, status]);

  return {
    initTimer,
    startTimer,
    stopTimer,
    playFinish,
  };
};
