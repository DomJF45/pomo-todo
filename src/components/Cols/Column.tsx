import { FunctionComponent, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { add, removeColumn } from "../../features/todo/listSlice";
import { iColumn } from "../../interfaces/list.interface";
import { iMenuItem } from "../Dropdown/types";
import Item from "./Item";
import Input from "./Input";
import Header from "./Header";
import Dropdown from "../Dropdown/Dropdown";

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
    setItem("");
  }

  function handleRemoveCol() {
    dispatch(removeColumn({ colId: col.id }));
  }

  const MENU_ITEMS: iMenuItem[] = [
    {
      name: "Delete",
      icon: {
        active: <HiTrash className="mr-2 h-5 w-5 text-white" />,
        inactive: <HiTrash className="mr-2 h-5 w-5 text-red-400" />,
      },
      cb: () => handleRemoveCol(),
    },
  ];

  return (
    <div className="w-[17rem] bg-[#ffffff20] rounded-xl h-max min-h-50 shadow-lg">
      <div className="p-3 h-100">
        <div className="flex flex-row">
          <Header col={col} />
          <Dropdown items={MENU_ITEMS} />
        </div>
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
