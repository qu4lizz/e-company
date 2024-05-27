import { db } from "../db/db";
import { Location } from "../types/Location";

export const createLocation = async (location: Location): Promise<void> => {
  await db.runAsync(
    "INSERT INTO location (name, address, latitude, longitude) VALUES (?, ?, ?, ?);",
    [location.name, location.address, location.latitude, location.longitude]
  );
};

export const getLocations = async (): Promise<Location[]> => {
  const allRows: Location[] = await db.getAllAsync("SELECT * FROM location");
  return allRows;
};

export const getLocationById = (id: number): Location => {
  const allRows: Location[] = db.getAllSync(
    "SELECT * FROM location WHERE id = ?;",
    [id]
  );
  return allRows[0];
};

export const getLocationsByName = async (name: string): Promise<Location[]> => {
  const allRows: Location[] = await db.getAllAsync(
    "SELECT * FROM location WHERE LOWER(name) LIKE LOWER('%' || ? || '%');",
    [name]
  );
  return allRows;
};

export const getLocationsByAddress = async (
  address: string
): Promise<Location[]> => {
  const allRows: Location[] = await db.getAllAsync(
    "SELECT * FROM location WHERE LOWER(address) LIKE LOWER('%' || ? || '%');",
    [address]
  );
  return allRows;
};

export const updateLocation = async (location: Location): Promise<void> => {
  await db.runAsync(
    "UPDATE location SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?;",
    [
      location.name,
      location.address,
      location.latitude,
      location.longitude,
      location.id!,
    ]
  );
};

export const deleteLocation = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM location WHERE id = ?;", [id]);
};
