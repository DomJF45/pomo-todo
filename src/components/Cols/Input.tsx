import { FunctionComponent, useRef } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import * as S from "../Styles";

interface InputProps {
  active: boolean;
  item: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetItem: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAdd: () => void;
}

const Input: FunctionComponent<InputProps> = ({
  active,
  item,
  setActive,
  handleSetItem,
  handleAdd,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      if (textareaRef.current.scrollHeight > 150) {
        textareaRef.current.style.overflowY = "scroll";
        return;
      }
      textareaRef.current.style.overflowY = "hidden";
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleAddItem = () => {
    closeText();
    handleAdd();
  };

  const openText = () => {
    setActive(true);
  };
  const closeText = () => {
    setActive(false);
  };

  return (
    <div className="flex flex-row items-center gap-3 p-2">
      {active && (
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-[#ffffff20] w-full rounded-md p-2 flex flex-row items-start h-fit">
            <textarea
              ref={textareaRef}
              className="w-full h-auto bg-transparent outline-none resize-none max-heigh-[200px] text-white"
              placeholder="Enter Card Title"
              value={item}
              onChange={(e) => {
                handleTextAreaChange();
                handleSetItem(e);
              }}
            />
          </div>
          <div className="flex flex-row gap-3 text-sm">
            <S.AddButton className="w-1/4" onClick={handleAddItem}>
              Add
            </S.AddButton>
            <S.Button onClick={closeText}>
              <HiX />
            </S.Button>
          </div>
        </div>
      )}
      {!active && (
        <S.Button
          className="w-full flex flex-row items-center rounded-md hover:bg-slate-200 text-start p-2 text-sm font-bold text-white"
          onClick={openText}
        >
          <HiPlus /> Add a Card
        </S.Button>
      )}
    </div>
  );
};

export default Input;
