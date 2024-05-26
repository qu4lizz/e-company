import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { setHeader } from "../reducers/headerSlice";
import { Assets } from "../screens/Assets";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SearchFilterHeader } from "./SearchFilterHeader";
import { Employees } from "../screens/Employees";
import { Locations } from "../screens/Locations";
import { InventoryLists } from "../screens/InventoryLists";
import { useAppDispatch } from "../reducers/store";
import { Settings } from "../screens/Settings";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();

  return (
    <Tab.Navigator
      initialRouteName="Assets"
      screenOptions={{ tabBarShowLabel: false }}
      screenListeners={{
        tabPress: async () => {
          dispatch(await setHeader("falsifyAll"));
        },
      }}
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
          headerRight: () => <SearchFilterHeader />,
          headerTitle: t("assets"),
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
          headerRight: () => <SearchFilterHeader />,
          headerTitle: t("employees"),
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
          headerTitle: t("settings"),
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
          headerRight: () => <SearchFilterHeader />,
          headerTitle: t("locations"),
        }}
      />
      <Tab.Screen
        name="InventoryLists"
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
          headerTitle: t("inventoryLists"),
        }}
      />
    </Tab.Navigator>
  );
}
