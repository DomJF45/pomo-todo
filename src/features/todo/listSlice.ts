import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { iColumn, iItem } from "../../interfaces/list.interface";

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
    move: (state, action: PayloadAction<{ colId: string; itemId: string }>) => {
      const newCols = [...state.columns]; // shallow copy
      const currentColIndex = newCols.findIndex(
        (col) => col.id === action.payload.colId
      ); // get index of current col
      const targetItemIndex = newCols[currentColIndex].items.findIndex(
        (item) => item.id === action.payload.itemId
      ); // get index of item

      // check if indices exist
      if (currentColIndex !== -1 && targetItemIndex !== -1) {
        // get item from array[index]
        const targetItem = newCols[currentColIndex].items[targetItemIndex];
        // remove item from index up (not including end)
        newCols[currentColIndex].items.splice(targetItemIndex, 1);

        // if the next index exists, push to next else to prev
        if (currentColIndex + 1 < newCols.length) {
          newCols[currentColIndex + 1].items.push(targetItem);
        } else if (currentColIndex - 1 >= 0) {
          newCols[0].items.push(targetItem);
        }
      }

      // assign shallow copy to state
      state.columns = saveWrapper(newCols);
    },
    remove: (
      state,
      action: PayloadAction<{ colId: string; itemId: string }>
    ) => {
      const newCols = [...state.columns];
      const targetCol = newCols.findIndex(
        (col) => col.id === action.payload.colId
      );
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
      const targetCol = newCols.findIndex((col) => col.id === colId);
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
  },
});

export const { add, move, remove, renameColumn, removeColumn, addColumn } =
  listSlice.actions;
export default listSlice.reducer;
