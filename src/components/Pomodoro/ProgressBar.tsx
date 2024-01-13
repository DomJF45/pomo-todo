import { useAppSelector } from "../../app/hooks";
import { timerMap } from "../../features/timer/timerSlice";
import { useStatusColor } from "../../hooks/useStatus";

const ProgressBar = () => {
  const { progressColor } = useStatusColor();
  const { time, status } = useAppSelector((state) => state.timer);
  const totalTime = timerMap[status].time;
  const percentage = ((totalTime - time) / totalTime) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${progressColor} h-2 rounded-full ease-in duration-150`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
