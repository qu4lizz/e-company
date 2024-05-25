import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Employee as EmployeeType } from "../types/Employee";
import { getEmployees } from "../db/employee";
import { Employee } from "../components/Employee";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Modal, Portal, useTheme } from "react-native-paper";
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

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    getEmployees().then((res) => {
      setEmployees(res);
    });
  };

  const { t } = useTranslation("home");
  const theme = useTheme();
  const route = useRoute();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={
            route.name === t("employees") &&
            (states.filter || states.add || states.search)
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
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={employees}
        renderItem={({ item }) => <Employee employee={item} />}
      />
    </View>
  );
}
