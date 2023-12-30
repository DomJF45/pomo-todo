import { FunctionComponent, useState } from "react";
import Item from "./Item";
import Input from "./Input";
import { useAppDispatch } from "../../app/hooks";
import { add } from "../../features/todo/listSlice";
import { iColumn } from "../../interfaces/list.interface";

interface ColumnProps {
  col: iColumn;
}

const Column: FunctionComponent<ColumnProps> = ({ col }) => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<boolean>(false);
  const [item, setItem] = useState<string>("");

  function handleSetItem(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setItem(e.currentTarget.value);
  }

  function handleAdd() {
    dispatch(add({ colId: col.id, itemName: item }));
    setActive(false);
  }

  return (
    <div className="w-1/3 bg-[#ffffff20] rounded-xl h-max min-h-50">
      <div className="p-3 h-100">
        <h1 className="font-bold text-md text-white">{col.name}</h1>
        <div className="flex flex-col gap-3">
          {col.items.map((item) => (
            <Item colId={col.id} item={item} key={item.id} />
          ))}
        </div>
      </div>
      <Input
        active={active}
        item={item}
        setActive={setActive}
        handleSetItem={handleSetItem}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default Column;
