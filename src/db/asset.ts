import { db } from "../db/db";
import { Asset } from "../types/Asset";

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

export const getAssetById = async (id: number): Promise<Asset> => {
  const allRows: Asset[] = await db.getAllAsync(
    "SELECT * FROM asset WHERE id = ?;",
    [id]
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

export const deleteAsset = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM asset WHERE id = ?;", [id]);
};
