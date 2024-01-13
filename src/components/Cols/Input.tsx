import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import useEnterKey from "../../hooks/useEnterKey";
import useOutsideClick from "../../hooks/useOutsideClick";

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

  const closeText = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const handleAddItem = useCallback(() => {
    closeText();
    handleAdd();
  }, [closeText, handleAdd]);

  useEnterKey({ active, callback: handleAddItem });
  useOutsideClick({
    targetRefs: [textareaRef],
    callback: () => setActive(false),
  });

  useEffect(() => {
    if (active && textareaRef.current) {
      textareaRef.current.scrollIntoView();
    }
  }, [active]);

  return (
    <div className="flex flex-row items-center gap-3">
      {active && (
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-[#ffffff20] w-full rounded-md p-2 flex flex-row items-start h-fit">
            <textarea
              ref={textareaRef}
              className="w-full h-auto bg-transparent outline-none resize-none max-heigh-[200px] text-white"
              placeholder="Enter Card Title..."
              value={item}
              onChange={(e) => {
                handleTextAreaChange();
                handleSetItem(e);
              }}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
