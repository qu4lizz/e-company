import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("eCompany.db");

export const createTables = async (db: any) => {
  const assetQuery = `
    CREATE TABLE IF NOT EXISTS asset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      barcode TEXT NOT NULL UNIQUE,
      price REAL NOT NULL,
      created_at TEXT NOT NULL,
      location_id INTEGER NOT NULL,
      employee_id INTEGER NOT NULL,
      image BLOB NOT NULL,
      FOREIGN KEY(location_id) REFERENCES location(id),
      FOREIGN KEY(employee_id) REFERENCES employee(id)
    )
  `;

  const employeeQuery = `
    CREATE TABLE IF NOT EXISTS employee (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      start_date TEXT NOT NULL
    )
  `;

  const locationQuery = `
    CREATE TABLE IF NOT EXISTS location (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL
    )
  `;

  const inventoryList = `
    CREATE TABLE IF NOT EXISTS inventory_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `;

  const inventoryListItem = `
    CREATE TABLE IF NOT EXISTS inventory_list_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inventory_list_id INTEGER NOT NULL,
      asset_id INTEGER NOT NULL,
      current_employee_id INTEGER NOT NULL,
      new_employee_id INTEGER NOT NULL,
      current_location_id INTEGER NOT NULL,
      new_location_id INTEGER NOT NULL,
      FOREIGN KEY(inventory_list_id) REFERENCES inventory_list(id),
      FOREIGN KEY(asset_id) REFERENCES asset(id),
      FOREIGN KEY(current_employee_id) REFERENCES employee(id),
      FOREIGN KEY(new_employee_id) REFERENCES employee(id),
      FOREIGN KEY(current_location_id) REFERENCES location(id),
      FOREIGN KEY(new_location_id) REFERENCES location(id)
    )
  `;
  const settings = `
    CREATE TABLE IF NOT EXISTS settings (
      name TEXT NOT NULL PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;

  await db.runAsync(employeeQuery);
  await db.runAsync(locationQuery);
  await db.runAsync(assetQuery);
  await db.runAsync(inventoryList);
  await db.runAsync(inventoryListItem);
  await db.runAsync(settings);
};
