import { useAppSelector } from "../app/hooks";

export const useStatusColor = () => {
  const { status } = useAppSelector((state) => state.timer);
  const bgMap: { [key: string]: string } = {
    Pomodoro: "bg-red-500",
    "Short Break": "bg-cyan-500",
    "Long Break": "bg-indigo-500",
  };
  const bgMapStatus: { [key: string]: string } = {
    Pomodoro: "bg-red-700",
    "Short Break": "bg-cyan-700",
    "Long Break": "bg-indigo-700",
  };
  return { statusColor: bgMap[status], progressColor: bgMapStatus[status] };
};
