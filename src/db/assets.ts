import { db } from "../db/db";
import { Asset, AssetWithLocationAndEmployee } from "../types/Asset";

export const createAsset = async (asset: Asset): Promise<void> => {
  await db.runAsync(
    "INSERT INTO asset (name, description, barcode, price, created_at, location_id, employee_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    [
      asset.name,
      asset.description,
      asset.barcode,
      asset.price,
      asset.created_at!,
      asset.location_id,
      asset.employee_id,
      asset.image,
    ]
  );
};

export const getAssets = async (): Promise<Asset[]> => {
  const allRows: Asset[] = await db.getAllAsync("SELECT * FROM asset");
  return allRows;
};

export const getAssetsWithLocationAndEmployee = async (): Promise<
  AssetWithLocationAndEmployee[]
> => {
  const allRows = await db.getAllAsync(`
    SELECT 
      asset.id AS asset_id, 
      asset.name AS asset_name, 
      asset.description AS asset_description, 
      asset.barcode AS asset_barcode, 
      asset.price AS asset_price, 
      asset.created_at AS asset_created_at, 
      asset.image AS asset_image,
      location.id AS location_id, 
      location.name AS location_name, 
      location.address AS location_address, 
      location.latitude AS location_latitude, 
      location.longitude AS location_longitude,
      employee.id AS employee_id, 
      employee.name AS employee_name,
      employee.role AS employee_role, 
      employee.start_date AS employee_start_date 
    FROM asset 
    INNER JOIN location ON asset.location_id = location.id 
    INNER JOIN employee ON asset.employee_id = employee.id;
  `);

  return allRows.map((row: any) => ({
    id: row.asset_id,
    name: row.asset_name,
    description: row.asset_description,
    barcode: row.asset_barcode,
    price: row.asset_price,
    created_at: row.asset_created_at,
    image: row.asset_image,
    location: {
      id: row.location_id,
      name: row.location_name,
      address: row.location_address,
      latitude: row.location_latitude,
      longitude: row.location_longitude,
    },
    employee: {
      id: row.employee_id,
      name: row.employee_name,
      role: row.employee_role,
      start_date: row.employee_start_date,
    },
  }));
};

export const getAssetById = async (id: number): Promise<Asset> => {
  const allRows: Asset[] = await db.getAllAsync(
    "SELECT * FROM asset WHERE id = ?;",
    [id]
  );
  return allRows[0];
};

export const getAssetByBarcode = async (barcode: string): Promise<Asset> => {
  const allRows: Asset[] = await db.getAllAsync(
    "SELECT * FROM asset WHERE barcode = ?;",
    [barcode]
  );
  return allRows[0];
};

export const getAssetsByLocationId = async (
  location_id: number
): Promise<Asset[]> => {
  return db.getAllAsync("SELECT * FROM asset WHERE location_id = ?;", [
    location_id,
  ]);
};

export const getAssetsByStartDate = async (isBefore: boolean, date: Date) => {
  const allRows: Asset[] = await db.getAllAsync(
    "SELECT * FROM asset WHERE created_at " + (isBefore ? "<" : ">=") + " ?;",
    [date.toISOString()]
  );
  return allRows;
};

export const getAssetsByName = async (name: string): Promise<Asset[]> => {
  const allRows: Asset[] = await db.getAllAsync(
    "SELECT * FROM asset WHERE LOWER(name) LIKE LOWER('%' || ? || '%');",
    [name]
  );
  return allRows;
};

export const updateAsset = async (asset: Asset): Promise<void> => {
  await db.runAsync(
    "UPDATE asset SET name = ?, description = ?, barcode = ?, price = ?, location_id = ?, employee_id = ?, image = ? WHERE id = ?;",
    [
      asset.name,
      asset.description,
      asset.barcode,
      asset.price,
      asset.location_id,
      asset.employee_id,
      asset.image,
      asset.id!,
    ]
  );
};

export const updateAssetEmployee = async (
  assetId: number,
  employeeId: number
): Promise<void> => {
  await db.runAsync("UPDATE asset SET employee_id = ? WHERE id = ?;", [
    employeeId,
    assetId,
  ]);
};

export const updateAssetLocation = async (
  assetId: number,
  locationId: number
): Promise<void> => {
  await db.runAsync("UPDATE asset SET location_id = ? WHERE id = ?;", [
    locationId,
    assetId,
  ]);
};

export const deleteAsset = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM asset WHERE id = ?;", [id]);
};
