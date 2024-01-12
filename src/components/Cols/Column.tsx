import { FunctionComponent, useState } from "react";
import { HiTrash, HiX, HiPlus } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { add, removeColumn } from "../../features/todo/listSlice";
import { iColumn } from "../../interfaces/list.interface";
import { iMenuItem } from "../Dropdown/types";
import Item from "./Item";
import Input from "./Input";
import Header from "./Header";
import Dropdown from "../Dropdown/Dropdown";
import { Draggable } from "react-beautiful-dnd";
import * as S from "../Styles";
import BlankItem from "./BlankItem";

interface ColumnProps extends React.HTMLProps<HTMLDivElement> {
  col: iColumn;
  isDraggingOver: boolean;
}

const Column: FunctionComponent<ColumnProps> = ({
  col,
  isDraggingOver,
  ...rest
}) => {
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

  const getListStyle = `${
    isDraggingOver ? "bg-[#ffffff50]" : "bg-[#ffffff20]"
  }`;

  const getInnerListStyle = isDraggingOver ? "h-[100px]" : "h-max";

  return (
    <div
      className={`w-[17rem] ${getListStyle} rounded-xl min-h-50 max-h-[100%] shadow-lg`}
      {...rest}
    >
      <div className="flex flex-col p-3 h-100 gap-3">
        <div className="flex flex-row">
          <Header col={col} />
          <Dropdown items={MENU_ITEMS} />
        </div>
        <S.ListContainer
          className={`flex flex-col gap-3 max-h-[65vh] overflow-y-auto ${getInnerListStyle}`}
        >
          {isDraggingOver && <BlankItem />}
          {col.items.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Item
                    colId={col.id}
                    item={item}
                    key={item.id}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps.style}
                  />
                </div>
              )}
            </Draggable>
          ))}
          <Input
            active={active}
            item={item}
            setActive={setActive}
            handleSetItem={handleSetItem}
            handleAdd={handleAdd}
          />
        </S.ListContainer>
        <div className="flex flex-row gap-3 text-sm">
          {active ? (
            <>
              <S.AddButton
                className="w-1/4 bg-slate-200 p-2"
                onClick={handleAdd}
              >
                Add
              </S.AddButton>
              <S.Button onClick={() => setActive(false)} className="p-2">
                <HiX />
              </S.Button>
            </>
          ) : (
            <S.Button
              className="w-full flex flex-row items-center rounded-md hover:bg-slate-200 text-start p-2 text-sm font-bold text-white"
              onClick={() => setActive(true)}
            >
              <HiPlus /> Add a Card
            </S.Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;
