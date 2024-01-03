import { useEffect, useRef, useState, useCallback } from "react";
import Column from "./Column";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { HiX } from "react-icons/hi";
import { addColumn } from "../../features/todo/listSlice";

const List = () => {
  const { columns } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();
  const [makeNewCol, setMakeNewCol] = useState<boolean>(false);
  const [newColName, setNewColName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddCol = useCallback(() => {
    setNewColName((name) => name.trim());
    if (newColName === "" || newColName[0] === " ") {
      setMakeNewCol(false);
      return;
    }
    dispatch(addColumn(newColName));
    setMakeNewCol(false);
    setNewColName("");
  }, [dispatch, newColName]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMakeNewCol(false);
        setNewColName("");
      }
    };

    const handleEnter = (e: KeyboardEvent) => {
      if (makeNewCol && e.key === "Enter") {
        handleAddCol();
        setNewColName("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEnter);
    };
  }, [handleAddCol, makeNewCol]);

  return (
    <div className="w-3/4 flex flex-col items-start overflow-x-auto h-max pb-3">
      <div className="w-max h-full flex flex-row justify-start gap-8">
        {columns.map((col) => (
          <Column col={col} key={col.id} />
        ))}
        {makeNewCol ? (
          <div className="w-[17rem] bg-[#ffffff20] rounded-xl h-max min-h-50">
            <div className="flex flex-col p-3 h-100 gap-5">
              <input
                ref={inputRef}
                className="cursor-pointer rounded-md pl-2 font-bold text-sm p-2"
                placeholder="Enter list title..."
                value={newColName}
                autoFocus
                onChange={(e) => setNewColName(e.currentTarget.value)}
              />
              <div className="inline-flex gap-1">
                <button
                  ref={buttonRef}
                  className="bg-slate-200 p-2 rounded-md"
                  onClick={handleAddCol}
                >
                  Add list
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#ffffff20]"
                  onClick={() => setMakeNewCol(false)}
                >
                  <HiX />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-[#ffffff20] w-[17rem] h-max rounded-lg p-3 text-sm font-bold text-slate-200 text-start"
            onClick={() => setMakeNewCol(true)}
          >
            + Add another list
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
