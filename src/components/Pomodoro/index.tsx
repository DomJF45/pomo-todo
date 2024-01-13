import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { start, stop, tick, init, move } from "../../features/timer/timerSlice";
import { updateTitle } from "../../utils/updateTitle";

const MOCK_STATUS = [
  { status: "Pomodoro" },
  { status: "Short Break" },
  { status: "Long Break" },
];

const TIMER_BUTTON = {
  ACTIVE: "bg-slate-200",
  INACTIVE: "w-full bg-[#ffffff20] text-slate-300",
};

const buttonPress = new Audio("/ButtonPress.mp3");
const endTimer = new Audio("/EndTimer.mp3");

const Pomodoro = () => {
  const {
    formattedTime,
    on: timerIsOn,
    status,
    time,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const handlePressSound = () => {
    if (buttonPress.paused) {
      buttonPress.play();
    } else {
      buttonPress.currentTime = 0;
    }
  };
  const handleStart = () => {
    dispatch(start());
    handlePressSound();
  };

  const handleStop = () => {
    dispatch(stop());
    handlePressSound();
  };

  const handleInit = (timer: string) => {
    dispatch(init(timer));
  };

  const handlePlayFinish = () => {
    endTimer.play();
  };

  const startStopButtonLabel = timerIsOn ? "STOP" : "START";

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(tick());
    }, 1000);

    if (time <= 0) {
      dispatch(move());
      handlePlayFinish();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, time]);

  useEffect(() => {
    updateTitle(formattedTime, status);
  }, [formattedTime, status]);

  return (
    <div className="w-1/3 h-full flex flex-col gap-5">
      <div className="bg-[#ffffff20] h-max flex flex-col justify-end rounded-xl items-center shadow-lg py-10">
        <div className="flex flex-col h-full justify-evenly items-center gap-5 mx-auto w-full">
          <div className="text-white text-7xl text-center font-mono w-full tracking-wide">
            {formattedTime}
          </div>
          <button
            className="bg-white w-20 rounded-md size-10"
            onClick={timerIsOn ? handleStop : handleStart}
          >
            {startStopButtonLabel}
          </button>
        </div>
      </div>
      <div className="w-full bg-slate-300 h-px" />
      <div className="w-full flex flex-col gap-5 h-full">
        {MOCK_STATUS.map((stat) => (
          <div
            className={`w-full p-3 rounded-lg text-sm cursor-pointer shadow-md ${
              status === stat.status
                ? TIMER_BUTTON.ACTIVE
                : TIMER_BUTTON.INACTIVE
            }`}
            key={stat.status}
            onClick={() => handleInit(stat.status)}
          >
            <p>{stat.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pomodoro;
