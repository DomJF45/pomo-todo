import { FunctionComponent } from "react";
import { HiArrowNarrowRight, HiX } from "react-icons/hi";
import * as S from "../Styles";
import { iItem } from "../../interfaces/list.interface";
import { useAppDispatch } from "../../app/hooks";
import { move, remove } from "../../features/todo/listSlice";

interface ItemProps {
  colId: string;
  item: iItem;
}

const Item: FunctionComponent<ItemProps> = ({ colId, item }) => {
  const dispatch = useAppDispatch();

  function handleMove() {
    dispatch(
      move({
        colId: colId,
        itemId: item.id,
      })
    );
  }

  function handleDelete() {
    dispatch(
      remove({
        colId: colId,
        itemId: item.id,
      })
    );
  }

  return (
    <div className="p-3 bg-slate-100 rounded-md flex flex-row justify-between">
      <p>{item.name}</p>
      <div className="flex flex-row justify-between">
        <S.Button className="px-3" onClick={handleDelete} $primary>
          <HiX />
        </S.Button>
        <S.Button className="px-3" onClick={handleMove} $primary>
          <HiArrowNarrowRight />
        </S.Button>
      </div>
    </div>
  );
};

export default Item;
