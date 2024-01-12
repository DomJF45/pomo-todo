import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { iColumn, iItem } from "../../interfaces/list.interface";
import { findTargetColumnById } from "./utils";

interface ListState {
  columns: iColumn[];
}

const listFromStorage = localStorage.getItem("list");
const initialCols: iColumn[] = listFromStorage
  ? JSON.parse(listFromStorage)
  : [];

const initialState: ListState = {
  columns: initialCols,
};

function saveWrapper(list: iColumn[]): iColumn[] {
  localStorage.setItem("list", JSON.stringify(list));
  return list;
}

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ colId: string; itemName: string }>
    ) => {
      const newCols = [...state.columns]; // shallow copy
      const targetCol = newCols.find((col) => col.id === action.payload.colId);

      if (targetCol) {
        const newItem: iItem = {
          name: action.payload.itemName,
          id: nanoid(),
        };
        targetCol.items.push(newItem);
        state.columns = saveWrapper(newCols);
      }
    },
    move: (
      state,
      action: PayloadAction<{
        source: iColumn;
        destination: iColumn;
        droppableSource: { index: number };
        droppableDestination: { index: number };
      }>
    ) => {
      const { source, destination, droppableSource, droppableDestination } =
        action.payload;
      const sourceClone = [...source.items];
      const destClone = [...destination.items];
      const [removed] = sourceClone.splice(droppableSource.index, 1);
      destClone.splice(droppableDestination.index, 0, removed);
      const newCols = [...state.columns];
      const sourceColIndex = findTargetColumnById(newCols, source.id);
      const destColIndex = findTargetColumnById(newCols, destination.id);

      if (sourceColIndex !== -1 && destColIndex !== -1) {
        newCols[sourceColIndex].items = sourceClone;
        newCols[destColIndex].items = destClone;

        state.columns = saveWrapper(newCols);
      }
    },
    remove: (
      state,
      action: PayloadAction<{ colId: string; itemId: string }>
    ) => {
      const newCols = [...state.columns];
      const targetCol = findTargetColumnById(newCols, action.payload.colId);
      const targetItem = newCols[targetCol].items.findIndex(
        (item) => item.id === action.payload.itemId
      );

      if (targetCol !== -1 && targetItem !== -1) {
        newCols[targetCol].items.splice(targetItem, 1);
      }
      state.columns = saveWrapper(newCols);
    },
    renameColumn: (
      state,
      action: PayloadAction<{ colId: string; newName: string }>
    ) => {
      const { colId, newName } = action.payload;
      const newCols = [...state.columns];
      const targetCol = newCols.find((col) => col.id === colId);
      if (targetCol) {
        targetCol.name = newName;
      }

      state.columns = saveWrapper(newCols);
    },
    removeColumn: (state, action: PayloadAction<{ colId: string }>) => {
      const { colId } = action.payload;
      const newCols = [...state.columns];
      const targetCol = findTargetColumnById(newCols, colId);
      if (targetCol !== -1) {
        newCols.splice(targetCol, 1);
      }

      state.columns = saveWrapper(newCols);
    },
    addColumn: (state, action: PayloadAction<string>) => {
      const newCols = [...state.columns];
      const newCol: iColumn = {
        name: action.payload,
        id: nanoid(),
        items: [],
      };
      newCols.push(newCol);
      state.columns = saveWrapper(newCols);
    },
    reorder: (
      state,
      action: PayloadAction<{
        list: iColumn;
        startIndex: number;
        endIndex: number;
      }>
    ) => {
      const { list, startIndex, endIndex } = action.payload;
      const newCols = [...state.columns];
      const targetCol = findTargetColumnById(newCols, list.id);
      if (targetCol !== -1) {
        const [removed] = newCols[targetCol].items.splice(startIndex, 1);
        newCols[targetCol].items.splice(endIndex, 0, removed);
      }

      state.columns = saveWrapper(newCols);
    },
  },
});

export const {
  add,
  move,
  remove,
  renameColumn,
  removeColumn,
  addColumn,
  reorder,
} = listSlice.actions;
export default listSlice.reducer;
