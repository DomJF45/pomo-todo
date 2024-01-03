import { FunctionComponent, useState, useRef, useEffect } from "react";
import { iColumn } from "../../interfaces/list.interface";
import { useAppDispatch } from "../../app/hooks";
import { renameColumn } from "../../features/todo/listSlice";

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

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setEdit(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (edit && e.key === "Enter") {
        setEdit(false);
      }
    };

    document.addEventListener("mousedown", handleOutSideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [edit]);

  console.log("render");
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
