import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { Employee as EmployeeType } from "../types/Employee";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { CreateNewEmployee } from "./CreateNewEmployee";
import { AreYouSure } from "./AreYouSure";
import { deleteEmployee } from "../db/employee";

const styles = StyleSheet.create({
  textFormat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
    width: "100%",
  },
  iconsContainer: {
    display: "flex",
    gap: 10,
  },
});

interface EmployeeProps {
  employee: EmployeeType;
  reload: () => void;
}

export function Employee({ employee, reload }: EmployeeProps) {
  const { t } = useTranslation("home");
  const theme = useTheme();

  const [isEditing, setEdit] = useState(false);
  const [isDeleting, setDelete] = useState(false);

  const onDelete = () => {
    deleteEmployee(employee.id!).then(() => setDelete(false));
    reload();
  };

  const onDeleteCancel = () => {
    setDelete(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <Portal>
        <Modal
          visible={isEditing || isDeleting}
          onDismiss={() => {
            setEdit(false);
            setDelete(false);
          }}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            padding: 20,
            width: "85%",
            alignSelf: "center",
          }}
        >
          <View>
            <ScrollView>
              {isEditing && (
                <CreateNewEmployee
                  reload={reload}
                  employee={employee}
                  setEdit={setEdit}
                />
              )}
              {isDeleting && (
                <AreYouSure onDelete={onDelete} onCancel={onDeleteCancel} />
              )}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      <View style={[styles.textFormat, { width: "30%" }]}>
        <Text variant="bodyMedium">{t("nameAndSurname")}</Text>
        <Text variant="titleMedium">{employee.name}</Text>
      </View>
      <View style={[styles.textFormat, { width: "25%" }]}>
        <Text variant="bodyMedium">{t("role")}</Text>
        <Text variant="titleMedium">{employee.role}</Text>
      </View>
      <View style={[styles.textFormat, { width: "30%" }]}>
        <Text variant="bodyMedium">{t("startDate")}</Text>
        <Text variant="titleMedium">
          {formatDate(employee.start_date, "date")}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable
          style={{
            borderColor: theme.colors.primary,
            borderRadius: 10,
            borderWidth: 2,
            padding: 5,
          }}
          onPress={() => setEdit(true)}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={30}
            color={theme.colors.primary}
          />
        </Pressable>
        <Pressable
          style={{
            borderColor: theme.colors.primary,
            borderRadius: 10,
            borderWidth: 2,
            padding: 5,
          }}
          onPress={() => setDelete(true)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}
