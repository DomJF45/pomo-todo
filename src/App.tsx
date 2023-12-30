import List from "./components/Cols/List";
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <div className="w-full p-10 h-screen bg-[#121212] flex flex-col items-start gap-10">
      <h1 className="text-xl text-white">Grublin Tools ⚡️</h1>
      <div className="flex flex-row w-full h-full">
        <Pomodoro />
        <List />
      </div>
    </div>
  );
}

export default App;
