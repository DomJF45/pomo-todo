import Column from "./Column";
import { useAppSelector } from "../../app/hooks";

const List = () => {
  const { columns } = useAppSelector((state) => state.list);

  return (
    <div className="w-full px-10 flex flex-col items-start gap-10">
      <div className="w-full h-full flex flex-row justify-start gap-8">
        {columns.map((col) => (
          <Column col={col} />
        ))}
      </div>
    </div>
  );
};

export default List;
