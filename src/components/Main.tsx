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
import { SearchFilterHeader } from "./SearchFilterHeader";
import MarginLayout from "./MarginLayout";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Tab = createBottomTabNavigator();

const WrappedAssets = MarginLayout(Assets);
const WrappedEmployees = MarginLayout(Employees);
const WrappedSettings = MarginLayout(Settings);
const WrappedLocations = MarginLayout(Locations);
const WrappedInventoryLists = MarginLayout(InventoryLists);

export function Main() {
  const initDatabase = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    initDatabase();
  }, [initDatabase]);

  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Tab.Navigator
        initialRouteName="Assets"
        screenOptions={{ tabBarShowLabel: false }}
      >
        <Tab.Screen
          name="Assets"
          component={WrappedAssets}
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
          name="Employees"
          component={WrappedEmployees}
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
          component={WrappedSettings}
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
          component={WrappedLocations}
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
          component={WrappedInventoryLists}
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
