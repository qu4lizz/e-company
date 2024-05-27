import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { createNewStyles } from "../styles/styles";
import { Text } from "react-native-paper";

interface Props {
  setAssets: any;
}

export function FilterAssets({ setAssets }: Props) {
  const { t } = useTranslation(["home"]);

  return (
    <View style={createNewStyles.container}>
      <Text variant="titleLarge">{t("filterAssets")}</Text>
    </View>
  );
}
