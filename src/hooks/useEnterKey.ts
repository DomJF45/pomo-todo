import { useEffect } from "react";

interface UseEnterKeyProps {
  active: boolean;
  callback: () => void;
}

const useEnterKey = ({ active, callback }: UseEnterKeyProps) => {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (active && e.key === "Enter") {
        callback();
      }
    };
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [active, callback]);
};

export default useEnterKey;
