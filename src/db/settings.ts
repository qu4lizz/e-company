import { db } from "../db/db";

export const updateTheme = async (theme: string): Promise<void> => {
  await db.runAsync(
    "INSERT OR REPLACE INTO settings (name, value) VALUES ('theme', ?);",
    [theme]
  );
};

export const getTheme = async (): Promise<string | null> => {
  const theme: any = await db.getFirstAsync(
    "SELECT value FROM settings WHERE name = 'theme';"
  );
  return theme.value;
};

export const updateLanguage = async (language: string): Promise<void> => {
  await db.runAsync(
    "INSERT OR REPLACE INTO settings (name, value) VALUES ('language', ?);",
    [language]
  );
};

export const getLanguage = async (): Promise<string | null> => {
  const language: any = await db.getFirstAsync(
    "SELECT value FROM settings WHERE name = 'language';"
  );
  return language.value;
};
