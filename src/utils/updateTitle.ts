import { Status } from "../features/timer/timerSlice";
import { TIME_FOR_A_BREAK, TIME_TO_FOCUS } from "./constants";

export const updateTitle = (time: string, mode: Status) => {
  const message = mode === Status.Pomodoro ? TIME_TO_FOCUS : TIME_FOR_A_BREAK;
  document.title = `${time} | ${message}`;
};
