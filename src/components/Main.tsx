import React, { useCallback, useEffect } from "react";
import { createTables } from "../db/db";
import { db } from "../db/db";
import { NavigationContainer as NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { registerTranslation, enGB } from "react-native-paper-dates";
import { CombinedDefaultTheme } from "../themes";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { CreateNewLocation } from "./CreateNewLocation";
import { Location } from "../types/Location";

export type RootStackParamList = {
  TabNavigator: {};
  CreateNewLocation: {
    reload: () => void;
    location?: Location;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export function Main() {
  const { t } = useTranslation("home");

  const initDatabase = useCallback(async () => {
    try {
      await createTables(db);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    initDatabase();
    registerTranslation("en-GB", enGB);
  }, [initDatabase]);

  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewLocation"
          component={CreateNewLocation}
          options={{
            title: t("createNewLocation"),
          }}
          initialParams={{
            reload: () => {},
            location: undefined,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
