import { db } from "../db/db";
import { Employee } from "../types/Employee";

export const createEmployee = async (employee: Employee): Promise<void> => {
  await db.runAsync(
    "INSERT INTO employee (name, role, start_date) VALUES (?, ?, ?);",
    [employee.name, employee.role, employee.start_date]
  );
};

export const getEmployees = async (): Promise<Employee[]> => {
  const allRows: Employee[] = await db.getAllAsync("SELECT * FROM employee");
  return allRows;
};

export const getEmployeesByName = async (name: string): Promise<Employee[]> => {
  const allRows: Employee[] = await db.getAllAsync(
    "SELECT * FROM employee WHERE LOWER(name) LIKE LOWER('%' || ? || '%');",
    [name]
  );
  return allRows;
};

export const getEmployeesByStartedDate = async (
  isBefore: boolean,
  date: Date
): Promise<Employee[]> => {
  const allRows: Employee[] = await db.getAllAsync(
    "SELECT * FROM employee WHERE start_date " +
      (isBefore ? "<" : ">=") +
      " ?;",
    [date.toISOString()]
  );
  return allRows;
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  await db.runAsync(
    "UPDATE employee SET name = ?, role = ?, start_date = ? WHERE id = ?;",
    [employee.name, employee.role, employee.start_date, employee.id!]
  );
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await db.runAsync("DELETE FROM employee WHERE id = ?;", [id]);
};
