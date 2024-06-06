import { db } from "../db/db";
import { InventoryListItem } from "../types/InventoryListItem";

export const createInventoryListItem = async (
  inventoryListItem: InventoryListItem
) => {
  await db.runAsync(
    "INSERT INTO inventory_list_item (inventory_list_id, asset_id, current_employee_id, new_employee_id, current_location_id, new_location_id) VALUES (?, ?, ?, ?, ?, ?);",
    [
      inventoryListItem.inventory_list_id,
      inventoryListItem.asset_id,
      inventoryListItem.current_employee_id,
      inventoryListItem.new_employee_id,
      inventoryListItem.current_location_id,
      inventoryListItem.new_location_id,
    ]
  );
};

export const getInventoryListItems = async (): Promise<InventoryListItem[]> => {
  const allRows: InventoryListItem[] = await db.getAllAsync(
    "SELECT * FROM inventory_list_item"
  );
  return allRows;
};

export const getInventoryListItemsByInventoryListId = async (
  inventory_list_id: number
): Promise<InventoryListItem[]> => {
  const allRows: InventoryListItem[] = await db.getAllAsync(
    "SELECT * FROM inventory_list_item WHERE inventory_list_id = ?;",
    [inventory_list_id]
  );
  return allRows;
};

export const deleteInventoryListItem = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM inventory_list_item WHERE id = ?;", [id]);
};
