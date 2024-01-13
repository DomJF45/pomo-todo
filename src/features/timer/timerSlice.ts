import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatTime } from "../../utils/formatTime";

export enum Status {
  Pomodoro = "Pomodoro",
  ShortBreak = "Short Break",
  LongBreak = "Long Break",
}

export const timerMap: {
  [key: string]: { time: number; formattedTime: string };
} = {
  Pomodoro: {
    time: 25 * 60,
    formattedTime: "25:00",
  },
  "Short Break": {
    time: 5 * 60,
    formattedTime: "05:00",
  },
  "Long Break": {
    time: 15 * 60,
    formattedTime: "15:00",
  },
};

const setTimerWithStatus = (
  status: Status
): {
  time: number;
  formattedTime: string;
  status: Status;
} => {
  return {
    time: timerMap[status].time,
    formattedTime: timerMap[status].formattedTime,
    status,
  };
};

interface TimerState {
  time: number;
  formattedTime: string;
  status: Status;
  on: boolean;
  iter: number;
}

const initialState: TimerState = {
  time: timerMap["Pomodoro"].time,
  formattedTime: timerMap["Pomodoro"].formattedTime,
  status: Status.Pomodoro,
  on: false,
  iter: 1,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<string>) => {
      const { time, formattedTime, status } = setTimerWithStatus(
        action.payload as Status
      );
      state.on = false;
      state.time = time;
      state.formattedTime = formattedTime;
      state.status = status;
    },
    start: (state) => {
      state.formattedTime = formatTime(state.time);
      state.on = true;
    },
    tick: (state) => {
      if (state.on) {
        state.time -= 1;
        state.formattedTime = formatTime(state.time);
      }

      if (state.time <= 0) {
        state.on = false;
      }
    },
    stop: (state) => {
      state.on = false;
    },
    move: (state) => {
      switch (state.status) {
        case Status.Pomodoro: {
          const fullCycle = state.iter >= 4 ? true : false;
          const { time, formattedTime, status } = setTimerWithStatus(
            fullCycle ? Status.LongBreak : Status.ShortBreak
          );
          state.time = time;
          state.formattedTime = formattedTime;
          state.status = status;
          fullCycle ? (state.iter = 1) : state.iter++;
          break;
        }
        case Status.ShortBreak: {
          const { time, formattedTime, status } = setTimerWithStatus(
            Status.Pomodoro
          );
          state.time = time;
          state.formattedTime = formattedTime;
          state.status = status;
          break;
        }
        case Status.LongBreak: {
          const { time, formattedTime, status } = setTimerWithStatus(
            Status.Pomodoro
          );
          state.time = time;
          state.formattedTime = formattedTime;
          state.status = status;
          break;
        }
      }
    },
  },
});

export const { init, start, tick, stop, move } = timerSlice.actions;
export default timerSlice.reducer;
