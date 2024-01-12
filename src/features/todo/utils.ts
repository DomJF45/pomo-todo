import { iColumn } from "../../interfaces/list.interface";

export function findTargetColumnById(columns: iColumn[], columnId: string) {
  const targetColumn: number = columns.findIndex((col) => col.id === columnId);
  return targetColumn;
}
