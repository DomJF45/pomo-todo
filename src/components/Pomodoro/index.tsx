import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { start, stop, tick, init, move } from "../../features/timer/timerSlice";

const MOCK_STATUS = [
  { status: "Pomodoro" },
  { status: "Short Break" },
  { status: "Long Break" },
];

const TIMER_BUTTON = {
  ACTIVE: "bg-slate-200",
  INACTIVE: "w-full bg-[#ffffff20] text-slate-300",
};

const Pomodoro = () => {
  const {
    formattedTime,
    on: timerIsOn,
    status,
    time,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(start());
  };

  const handleStop = () => {
    dispatch(stop());
  };

  const handleInit = (timer: string) => {
    dispatch(init(timer));
  };

  const startStopButtonLabel = timerIsOn ? "STOP" : "START";

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(tick());
    }, 1000);

    if (time <= 0) {
      dispatch(move());
    }

    return () => clearInterval(intervalId);
  }, [dispatch, time]);

  return (
    <div className="w-1/4 h-full flex flex-col gap-5">
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
