import { useAppSelector } from "./app/hooks";
import List from "./components/Cols/List";
import Pomodoro from "./components/Pomodoro";

function App() {
  const { status } = useAppSelector((state) => state.timer);

  const bgMap: { [key: string]: string } = {
    Pomodoro: "bg-red-500",
    "Short Break": "bg-cyan-500",
    "Long Break": "bg-indigo-500",
  };

  return (
    <div
      className={`w-full h-screen ${bgMap[status]} pl-10 py-10 flex flex-col items-start gap-10 ease-in duration-100`}
    >
      <h1 className="text-xl text-white">Pomo-todoro 🍅</h1>
      <div className="flex flex-row w-full gap-3 h-full">
        <Pomodoro />
        <List />
      </div>
    </div>
  );
}

export default App;
