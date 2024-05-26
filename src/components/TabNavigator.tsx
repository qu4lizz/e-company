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
  const { t } = useTranslation("home");
  const dispatch = useAppDispatch();

  return (
    <Tab.Navigator
      initialRouteName={t("assets")}
      screenOptions={{ tabBarShowLabel: false }}
      screenListeners={{
        tabPress: async () => {
          dispatch(await setHeader("falsifyAll"));
        },
      }}
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
  );
}
