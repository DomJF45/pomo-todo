const MOCK_STATUS = [
  { status: "Pomodoro", active: true },
  { status: "Short Break", active: false },
  { status: "Long Break", active: false },
];

const active = `bg-slate-200 cursor-pointer`;
const inactive = `w-full bg-[#ffffff20] text-slate-400`;

const Pomodoro = () => {
  return (
    <div className="w-1/2 h-full flex flex-col gap-5">
      <div className="bg-[#ffffff20] h-full flex flex-col justify-end rounded-lg">
        <div className="flex flex-col h-full justify-evenly items-center gap-5">
          <h1 className="text-white text-center text-8xl font-bold">25:00</h1>
          <button className="bg-white w-20 rounded-md size-10">START</button>
        </div>
      </div>
      <div className="w-full bg-slate-300 h-px" />
      <div className="w-full flex flex-col gap-5 h-full">
        {MOCK_STATUS.map((status) => (
          <div
            className={`w-full p-3 rounded-lg text-sm ${
              status.active ? active : inactive
            }`}
          >
            <p>{status.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pomodoro;
