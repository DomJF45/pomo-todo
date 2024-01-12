import { FunctionComponent } from "react";
import { HiX } from "react-icons/hi";
import * as S from "../Styles";
import { iItem } from "../../interfaces/list.interface";
import { useAppDispatch } from "../../app/hooks";
import { remove } from "../../features/todo/listSlice";

interface ItemProps extends React.HTMLProps<HTMLDivElement> {
  colId: string;
  item: iItem;
  isDragging: boolean;
}

const Item: FunctionComponent<ItemProps> = ({
  colId,
  item,
  isDragging,
  ...rest
}) => {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(
      remove({
        colId: colId,
        itemId: item.id,
      })
    );
  }

  const getItemStyle = isDragging ? "bg-slate-300 rotate-6" : "bg-slate-100";

  return (
    <div
      className={`p-3 ${getItemStyle} rounded-md flex flex-row justify-between select-none hover:border-1px border-pink-200`}
      {...rest}
    >
      <p>{item.name}</p>
      <div className="flex flex-row justify-between">
        <S.Button className="px-3" onClick={handleDelete} $primary>
          <HiX />
        </S.Button>
      </div>
    </div>
  );
};

export default Item;
