import { FunctionComponent, useState, useRef } from "react";
import { iColumn } from "../../interfaces/list.interface";
import { useAppDispatch } from "../../app/hooks";
import { renameColumn } from "../../features/todo/listSlice";
import useEnterKey from "../../hooks/useEnterKey";
import useOutsideClick from "../../hooks/useOutsideClick";

interface HeaderProps {
  col: iColumn;
}

const Header: FunctionComponent<HeaderProps> = ({ col }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleRename(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      renameColumn({
        colId: col.id,
        newName: e.currentTarget.value,
      })
    );
  }

  useOutsideClick({ targetRefs: [inputRef], callback: () => setEdit(false) });
  useEnterKey({ active: edit, callback: () => setEdit(false) });

  return (
    <div className="flex flex-row w-full justify-between">
      {edit ? (
        <input
          placeholder={col.name}
          value={col.name}
          onChange={handleRename}
          className="cursor-pointer rounded-md pl-2 font-bold text-sm"
          ref={inputRef}
          autoFocus
        />
      ) : (
        <h1
          className="font-bold text-sm text-white cursor-pointer w-full"
          onClick={() => {
            setEdit(true);
          }}
        >
          {col.name}
        </h1>
      )}
    </div>
  );
};

export default Header;
