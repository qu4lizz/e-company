import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Employee as EmployeeType } from "../types/Employee";
import { getEmployees, getEmployeesByName } from "../db/employee";
import { Employee } from "../components/Employee";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Modal, Portal, Searchbar, useTheme } from "react-native-paper";
import { CreateNewEmployee } from "../components/CreateNewEmployee";
import { useTranslation } from "react-i18next";
import { setHeader } from "../reducers/headerSlice";
import { ItemSeparator } from "../components/ItemSeparator";
import { FilterEmployees } from "../components/FilterEmployees";
import { itemsContainerStyles as styles, modalStyles } from "../styles/styles";

export function Employees() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { t } = useTranslation("home");
  const theme = useTheme();
  const route = useRoute();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();

  useEffect(() => {
    reload();
  }, [searchQuery]);

  const reload = () => {
    if (searchQuery.length > 0) {
      getEmployeesByName(searchQuery).then((res) => {
        setEmployees(res);
      });
    } else {
      getEmployees().then((res) => {
        setEmployees(res);
      });
    }
  };

  const reloadByFilter = async (employees: EmployeeType[]) => {
    setEmployees(employees);
    dispatch(await setHeader("falsifyAll"));
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={
            route.name === t("employees") && (states.filter || states.add)
          }
          onDismiss={async () => dispatch(await setHeader("falsifyAll"))}
          contentContainerStyle={[
            {
              backgroundColor: theme.colors.background,
            },
            modalStyles.container,
          ]}
        >
          <View>
            <ScrollView>
              {states.add && <CreateNewEmployee reload={reload} />}
              {states.filter && (
                <FilterEmployees setEmployees={reloadByFilter} />
              )}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      {route.name === t("employees") && states.search && (
        <Searchbar
          style={{ margin: 10 }}
          placeholder={t("searchByName")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onClearIconPress={async () => {
            setSearchQuery("");
            dispatch(await setHeader("falsifyAll"));
          }}
        />
      )}
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={employees}
        renderItem={({ item }) => <Employee employee={item} reload={reload} />}
      />
    </View>
  );
}
