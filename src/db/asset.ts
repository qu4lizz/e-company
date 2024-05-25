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
      asset.created_at,
      asset.location_id,
      asset.employee_id,
      asset.image,
    ]
  );
};

// Read all assets
export const getAssets = async (): Promise<Asset[]> => {
  const allRows: Asset[] = await db.getAllAsync("SELECT * FROM asset");
  return allRows;
};

// Update an asset
export const updateAsset = async (asset: Asset): Promise<void> => {
  await db.runAsync(
    "UPDATE asset SET name = ?, description = ?, barcode = ?, price = ?, created_at = ?, location_id = ?, employee_id = ?, image = ? WHERE id = ?;",
    [
      asset.name,
      asset.description,
      asset.barcode,
      asset.price,
      asset.created_at,
      asset.location_id,
      asset.employee_id,
      asset.image,
      asset.id,
    ]
  );
};

// Delete an asset
export const deleteAsset = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM asset WHERE id = ?;", [id]);
};
