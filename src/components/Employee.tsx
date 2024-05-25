import { Text, useTheme } from "react-native-paper";
import { Employee as EmployeeType } from "../types/Employee";
import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
}

export function Employee({ employee }: EmployeeProps) {
  const { t } = useTranslation("home");
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
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
