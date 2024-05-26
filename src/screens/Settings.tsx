import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { settingsStyles } from "../styles/styles";
import { SegmentedButtons, Switch, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { setLanguageAsync, setThemeAsync } from "../reducers/settingsSlice";
import { CustomDivider } from "../components/Divider";

export function Settings() {
  const { t, i18n } = useTranslation(["home"]);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const [isLightTheme, setIsLightTheme] = useState(settings.theme === "light");

  useEffect(() => {
    setIsLightTheme(settings.theme === "light");
  }, [settings.theme]);

  const changeTheme = () => {
    if (isLightTheme) {
      dispatch(setThemeAsync("dark"));
    } else {
      dispatch(setThemeAsync("light"));
    }
  };

  const changeLanguage = (value: string) => {
    const languageI18n = value === "english" ? "en" : "sr-Latn";
    i18n.changeLanguage(languageI18n);
    dispatch(setLanguageAsync(value));
  };

  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.item}>
        <View>
          <Text variant="titleMedium">{t("theme")}</Text>
          <Text variant="bodyMedium">
            {isLightTheme ? t("light") : t("dark")}
          </Text>
        </View>
        <Switch value={isLightTheme} onValueChange={changeTheme} />
      </View>
      <CustomDivider />
      <View style={settingsStyles.item}>
        <View>
          <Text variant="titleMedium">{t("language")}</Text>
          <Text variant="bodyMedium">{t(settings.language)}</Text>
        </View>
        <SegmentedButtons
          style={{ width: "60%" }}
          value={settings.language}
          onValueChange={changeLanguage}
          buttons={[
            {
              value: "serbian",
              label: t("serbian"),
            },
            {
              value: "english",
              label: t("english"),
            },
          ]}
        />
      </View>
    </View>
  );
}
