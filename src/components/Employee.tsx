import { Text } from "react-native-paper";
import { Employee as EmployeeType } from "../types/Employee";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 20,
    paddingRight: 90,
  },
  textFormat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});

interface EmployeeProps {
  employee: EmployeeType;
}

export function Employee({ employee }: EmployeeProps) {
  const { t } = useTranslation("home");

  return (
    <View style={styles.container}>
      <View style={styles.textFormat}>
        <Text variant="labelMedium">{t("name")}</Text>
        <Text variant="titleMedium">{employee.name}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textFormat}>
          <Text variant="labelMedium">{t("role")}</Text>
          <Text variant="titleMedium">{employee.role}</Text>
        </View>
        <View style={styles.textFormat}>
          <Text variant="labelMedium">{t("start_date")}</Text>
          <Text variant="titleMedium">{employee.start_date}</Text>
        </View>
      </View>
    </View>
  );
}
