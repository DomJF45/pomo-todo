import { useEffect } from "react";

interface UseOutsideClickProps<T extends HTMLElement> {
  targetRefs: React.RefObject<T>[];
  callback: () => void;
}

const useOutsideClick = <T extends HTMLElement>({
  targetRefs,
  callback,
}: UseOutsideClickProps<T>) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const anyTrueRefs = targetRefs.some((tr) => tr.current);
      if (
        anyTrueRefs &&
        !targetRefs.some((tr) => tr.current?.contains(e.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, targetRefs]);
};

export default useOutsideClick;
