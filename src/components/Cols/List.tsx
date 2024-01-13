import { useState, useCallback } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addColumn, move, reorder } from "../../features/todo/listSlice";
import Column from "./Column";
import NewColumn from "./NewColumn";
import { findTargetColumnById } from "../../features/todo/utils";
import * as S from "../Styles";

const List = () => {
  const { columns } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();
  const [makeNewCol, setMakeNewCol] = useState<boolean>(false);
  const [newColName, setNewColName] = useState<string>("");

  function onDragEnd(result: DropResult): void {
    const { source, destination } = result;

    if (!destination) return;

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    console.log("IDS: ", [sInd, dInd]);

    if (sInd === dInd) {
      const targetCol = findTargetColumnById(columns, sInd);
      if (targetCol !== -1) {
        dispatch(
          reorder({
            list: columns[targetCol],
            startIndex: source.index,
            endIndex: destination.index,
          })
        );
      }
    } else {
      const sTarget = findTargetColumnById(columns, sInd);
      const dTarget = findTargetColumnById(columns, dInd);
      if (sTarget !== -1 && dTarget !== -1) {
        dispatch(
          move({
            source: columns[sTarget],
            destination: columns[dTarget],
            droppableSource: source,
            droppableDestination: destination,
          })
        );
      }
    }
  }

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
    <DragDropContext onDragEnd={onDragEnd}>
      <S.ListContainer className="w-2/3 flex flex-col items-start overflow-x-auto h-full pb-3">
        <div className="w-max h-full flex flex-row justify-start gap-3">
          {columns.map((col) => (
            <Droppable droppableId={col.id} type="dropppableItem" key={col.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column
                    col={col}
                    key={col.id}
                    isDraggingOver={snapshot.isDraggingOver}
                  />
                </div>
              )}
            </Droppable>
          ))}
          <NewColumn
            makeNewCol={makeNewCol}
            newColName={newColName}
            setNewColName={setNewColName}
            setMakeNewCol={setMakeNewCol}
            handleAddCol={handleAddCol}
          />
        </div>
      </S.ListContainer>
    </DragDropContext>
  );
};

export default List;
