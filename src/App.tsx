import List from "./components/Cols/List";
import Pomodoro from "./components/Pomodoro";
import ProgressBar from "./components/Pomodoro/ProgressBar";
import { useStatusColor } from "./hooks/useStatus";

function App() {
  const { statusColor } = useStatusColor();

  return (
    <div
      className={`w-full h-screen ${statusColor} py-10 flex flex-col items-start gap-10 ease-in duration-100`}
    >
      <div className="flex flex-col gap-3 w-full px-10">
        <div className="flex flex-row gap-3 items-center w-full">
          <img src="/tomate.png" className="w-[50px]" />
          <h1 className="text-2xl text-white">Pomo-todo</h1>
        </div>
        <ProgressBar />
      </div>
      <div className="flex flex-row w-full gap-3 h-full pl-10">
        <Pomodoro />
        <List />
      </div>
    </div>
  );
}

export default App;
