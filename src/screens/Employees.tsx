import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Employee as EmployeeType } from "../types/Employee";
import { getEmployees } from "../db/employee";
import { Employee } from "../components/Employee";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export function Employees() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={({ item }) => <Employee employee={item} />}
      />
    </View>
  );
}
