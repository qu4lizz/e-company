import { db } from "../db/db";
import { InventoryList } from "../types/InventoryList";

export const createInventoryList = async (inventoryList: {
  name: string;
  created_at: string;
}): Promise<any> => {
  const res = await db.runAsync(
    "INSERT INTO inventory_list (name, created_at) VALUES (?, ?);",
    [inventoryList.name, inventoryList.created_at]
  );
  return res.lastInsertRowId;
};

export const getInventoryLists = async (): Promise<InventoryList[]> => {
  const allRows: InventoryList[] = await db.getAllAsync(
    "SELECT * FROM inventory_list"
  );
  return allRows;
};

export const getInventoryListById = async (
  id: number
): Promise<InventoryList> => {
  const allRows: InventoryList[] = await db.getAllAsync(
    "SELECT * FROM inventory_list WHERE id = ?;",
    [id]
  );
  return allRows[0];
};

export const getInventoryListsByName = async (
  name: string
): Promise<InventoryList[]> => {
  const allRows: InventoryList[] = await db.getAllAsync(
    "SELECT * FROM inventory_list WHERE LOWER(name) LIKE LOWER('%' || ? || '%');",
    [name]
  );
  return allRows;
};

export const updateInventoryList = async (
  inventoryList: InventoryList
): Promise<void> => {
  await db.runAsync("UPDATE inventory_list SET name = ? WHERE id = ?;", [
    inventoryList.name,
    inventoryList.id!,
  ]);
};

export const deleteInventoryList = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM inventory_list WHERE id = ?;", [id]);
};
