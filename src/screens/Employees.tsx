import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modal: {},
});

export function Employees() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

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

  const { t } = useTranslation("home");
  const theme = useTheme();
  const route = useRoute();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();

  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={
            route.name === t("employees") && (states.filter || states.add)
          }
          onDismiss={async () => dispatch(await setHeader("falsifyAll"))}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            padding: 20,
            width: "85%",
            alignSelf: "center",
          }}
        >
          <View>
            <ScrollView>
              {states.add && <CreateNewEmployee reload={reload} />}
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
