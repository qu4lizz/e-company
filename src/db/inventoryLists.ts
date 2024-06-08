import { db } from "../db/db";
import { InventoryList, InventoryListDetails } from "../types/InventoryList";
import { InventoryListItemDetails } from "../types/InventoryListItem";

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

export const getInventoryListById = async (
  inventory_list_id: number
): Promise<InventoryListDetails> => {
  const inventoryListRows = await db.getAllAsync(
    "SELECT * FROM inventory_list WHERE id = ?;",
    [inventory_list_id]
  );

  if (inventoryListRows.length === 0) {
    console.error(`No inventory list found with id: ${inventory_list_id}`);
  }

  const inventoryListRow: any = inventoryListRows[0];

  const inventoryListItemsRows: any = await db.getAllAsync(
    `SELECT
      ili.id AS inventory_list_item_id,
      a.id AS asset_id,
      a.name AS asset_name,
      a.description AS asset_description,
      a.barcode AS asset_barcode,
      a.price AS asset_price,
      a.created_at AS asset_created_at,
      a.image AS asset_image,
      ce.id AS current_employee_id,
      ce.name AS current_employee_name,
      ce.role AS current_employee_role,
      ce.start_date AS current_employee_start_date,
      ne.id AS new_employee_id,
      ne.name AS new_employee_name,
      ne.role AS new_employee_role,
      ne.start_date AS new_employee_start_date,
      cl.id AS current_location_id,
      cl.name AS current_location_name,
      cl.address AS current_location_address,
      cl.latitude AS current_location_latitude,
      cl.longitude AS current_location_longitude,
      nl.id AS new_location_id,
      nl.name AS new_location_name,
      nl.address AS new_location_address,
      nl.latitude AS new_location_latitude,
      nl.longitude AS new_location_longitude
    FROM inventory_list_item ili
    INNER JOIN asset a ON ili.asset_id = a.id
    INNER JOIN employee ce ON ili.current_employee_id = ce.id
    INNER JOIN employee ne ON ili.new_employee_id = ne.id
    INNER JOIN location cl ON ili.current_location_id = cl.id
    INNER JOIN location nl ON ili.new_location_id = nl.id
    WHERE ili.inventory_list_id = ?;`,
    [inventory_list_id]
  );

  const inventoryListItems: InventoryListItemDetails[] =
    inventoryListItemsRows.map((row: any) => ({
      id: row.inventory_list_item_id,
      asset: {
        id: row.asset_id,
        name: row.asset_name,
        description: row.asset_description,
        barcode: row.asset_barcode,
        price: row.asset_price,
        created_at: row.asset_created_at,
        image: row.asset_image,
      },
      current_employee: {
        id: row.current_employee_id,
        name: row.current_employee_name,
        role: row.current_employee_role,
        start_date: row.current_employee_start_date,
      },
      new_employee: {
        id: row.new_employee_id,
        name: row.new_employee_name,
        role: row.new_employee_role,
        start_date: row.new_employee_start_date,
      },
      current_location: {
        id: row.current_location_id,
        name: row.current_location_name,
        address: row.current_location_address,
        latitude: row.current_location_latitude,
        longitude: row.current_location_longitude,
      },
      new_location: {
        id: row.new_location_id,
        name: row.new_location_name,
        address: row.new_location_address,
        latitude: row.new_location_latitude,
        longitude: row.new_location_longitude,
      },
    }));

  const inventoryListDetails: InventoryListDetails = {
    id: inventoryListRow.id,
    name: inventoryListRow.name,
    created_at: inventoryListRow.created_at,
    assets: inventoryListItems,
  };

  return inventoryListDetails;
};
