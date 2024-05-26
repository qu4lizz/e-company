import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Employee as EmployeeType } from "../types/Employee";
import { getEmployees, getEmployeesByName } from "../db/employee";
import { Employee } from "../components/Employee";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Modal, Portal, Searchbar, useTheme } from "react-native-paper";
import { CreateNewEmployee } from "../components/CreateNewEmployee";
import { useTranslation } from "react-i18next";
import { setHeader } from "../reducers/headerSlice";
import { ItemSeparator } from "../components/ItemSeparator";
import { FilterEmployees } from "../components/FilterEmployees";
import {
  itemsContainerStyles as styles,
  modalStyles,
  searchbarStyles,
} from "../styles/styles";

export function Employees() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

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
          visible={isFocused && (states.filter || states.add)}
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
      {isFocused && states.search && (
        <Searchbar
          style={searchbarStyles.container}
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
