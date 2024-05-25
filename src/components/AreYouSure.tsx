import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    gap: 30,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

interface Props {
  onDelete: any;
  onCancel: any;
}

export function AreYouSure({ onDelete, onCancel }: Props) {
  const { t } = useTranslation("home");
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{t("areYouSure")}</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onCancel}>
          {t("cancel")}
        </Button>
        <Button
          mode="outlined"
          buttonColor={theme.colors.error}
          textColor={theme.colors.errorContainer}
          onPress={onDelete}
        >
          {t("yes")}
        </Button>
      </View>
    </View>
  );
}
