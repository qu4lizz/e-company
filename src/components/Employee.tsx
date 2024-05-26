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
import {
  singleItemStyles as styles,
  modalStyles,
  iconSize,
} from "../styles/styles";

interface Props {
  employee: EmployeeType;
  reload: () => void;
}

export function Employee({ employee, reload }: Props) {
  const { t } = useTranslation(["home"]);
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
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
    >
      <Portal>
        <Modal
          visible={isEditing || isDeleting}
          onDismiss={() => {
            setEdit(false);
            setDelete(false);
          }}
          contentContainerStyle={[
            modalStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
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
      <View style={styles.textFormat}>
        <Text variant="titleMedium">
          {t("nameAndSurname")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{employee.name}</Text>
        </Text>
        <Text variant="titleMedium">
          {t("role")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{employee.role}</Text>
        </Text>
        <Text variant="titleMedium">
          {t("startDate")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {formatDate(employee.start_date, "date")}
          </Text>
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable
          style={[{ borderColor: theme.colors.primary }, styles.icons]}
          onPress={() => setEdit(true)}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={iconSize}
            color={theme.colors.primary}
          />
        </Pressable>
        <Pressable
          style={[{ borderColor: theme.colors.primary }, styles.icons]}
          onPress={() => setDelete(true)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={iconSize}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}
