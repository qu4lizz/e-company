import React, { useCallback, useEffect, useState } from "react";
import { createTables } from "../db/db";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Assets } from "../screens/Assets";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Employees } from "../screens/Employees";
import { Settings } from "../screens/Settings";
import { Locations } from "../screens/Locations";
import { InventoryLists } from "../screens/InventoryLists";
import { db } from "../db/db";
import { NavigationContainer as NavigationContainer } from "@react-navigation/native";
import { SearchFilterHeader } from "./SearchFilterHeader";
import { useTranslation } from "react-i18next";
import { registerTranslation, enGB } from "react-native-paper-dates";
import { CombinedDefaultTheme } from "../themes";

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator
        initialRouteName={t("assets")}
        screenOptions={{ tabBarShowLabel: false }}
      >
        <Tab.Screen
          name={t("assets")}
          component={Assets}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="archive-outline"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <SearchFilterHeader />,
          }}
        />
        <Tab.Screen
          name={t("employees")}
          component={Employees}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="badge-account-outline"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <SearchFilterHeader />,
          }}
        />
        <Tab.Screen
          name={t("settings")}
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <SearchFilterHeader />,
          }}
        />
        <Tab.Screen
          name={t("locations")}
          component={Locations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker-outline"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <SearchFilterHeader />,
          }}
        />
        <Tab.Screen
          name={t("inventoryLists")}
          component={InventoryLists}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-list-outline"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <SearchFilterHeader />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
