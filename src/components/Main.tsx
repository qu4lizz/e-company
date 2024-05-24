import React, { useCallback, useEffect } from "react";
import { connectToDatabase, createTables } from "../db/db";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Assets } from "../screens/Assets";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Employees } from "../screens/Employees";
import { Settings } from "../screens/Settings";
import { Locations } from "../screens/Locations";
import { InventoryLists } from "../screens/InventoryLists";
import { useTheme } from "react-native-paper";
import {
  NavigationContainer as NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Tab = createBottomTabNavigator();

export function Main() {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const theme = useTheme();

  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Tab.Navigator
        initialRouteName="Assets"
        screenOptions={{ tabBarShowLabel: false }}
      >
        <Tab.Screen
          name="Assets"
          component={Assets}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="archive-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Employees"
          component={Employees}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="badge-account-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Locations"
          component={Locations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryLists}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-list-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
