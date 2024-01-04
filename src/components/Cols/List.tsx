import { useState, useCallback } from "react";
import Column from "./Column";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addColumn } from "../../features/todo/listSlice";
import NewColumn from "./NewColumn";

const List = () => {
  const { columns } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();
  const [makeNewCol, setMakeNewCol] = useState<boolean>(false);
  const [newColName, setNewColName] = useState<string>("");

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

  return (
    <div className="w-3/4 flex flex-col items-start overflow-x-auto h-max pb-3">
      <div className="w-max h-full flex flex-row justify-start gap-8">
        {columns.map((col) => (
          <Column col={col} key={col.id} />
        ))}
        <NewColumn
          makeNewCol={makeNewCol}
          newColName={newColName}
          setNewColName={setNewColName}
          setMakeNewCol={setMakeNewCol}
          handleAddCol={handleAddCol}
        />
      </div>
    </div>
  );
};

export default List;
