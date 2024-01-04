import { useRef, FunctionComponent, SetStateAction } from "react";
import { HiX } from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEnterKey from "../../hooks/useEnterKey";

interface NewColumnProps {
  makeNewCol: boolean;
  newColName: string;
  setNewColName: React.Dispatch<SetStateAction<string>>;
  setMakeNewCol: React.Dispatch<SetStateAction<boolean>>;
  handleAddCol: () => void;
}

const NewColumn: FunctionComponent<NewColumnProps> = ({
  makeNewCol,
  newColName,
  setNewColName,
  setMakeNewCol,
  handleAddCol,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNewCol = () => {
    handleAddCol();
    setMakeNewCol(false);
    setNewColName("");
  };

  useOutsideClick({
    targetRefs: [inputRef, buttonRef],
    callback: () => setMakeNewCol(false),
  });
  useEnterKey({
    active: makeNewCol,
    callback: handleNewCol,
  });

  return (
    <>
      {makeNewCol ? (
        <div className="w-[17rem] bg-[#ffffff20] rounded-xl h-max min-h-50 shadow-lg">
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
          className="bg-[#ffffff20] w-[17rem] h-max rounded-lg p-3 text-sm font-bold text-slate-200 text-start shadow-lg"
          onClick={() => setMakeNewCol(true)}
        >
          + Add another list
        </button>
      )}
    </>
  );
};

export default NewColumn;
