import React, { Suspense, useCallback, useEffect } from "react";
import { createTables } from "../db/db";
import { db } from "../db/db";
import { NavigationContainer as NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { registerTranslation, enGB } from "react-native-paper-dates";
import { CombinedDefaultTheme, CombinedDarkTheme } from "../themes";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { CreateNewLocation } from "../screens/CreateNewLocation";
import { Location } from "../types/Location";
import { PaperProvider } from "react-native-paper";
import { Fallback } from "../screens/Fallback";
import { initializeSettings } from "../reducers/settingsSlice";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Asset } from "../types/Asset";
import { CreateNewAsset } from "../screens/CreateNewAsset";
import { AssetDetails } from "../screens/AssetDetails";
import { AssetsOnLocation } from "../screens/AssetsOnLocation";
import { InventoryList } from "../types/InventoryList";
import { CreateNewInventoryList } from "../screens/CreateNewInventoryList";

export type RootStackParamList = {
  TabNavigator: {};
  CreateNewLocation: {
    reload: () => void;
    location?: Location;
  };
  CreateNewAsset: {
    reload: () => void;
    asset?: Asset;
  };
  AssetDetails: {
    asset: Asset;
    onDelete: () => void;
    reload: () => void;
  };
  AssetsOnLocation: {
    location_id: number;
  };
  CreateNewInventoryList: {
    reload: () => void;
    inventoryList?: InventoryList;
  };
  InventoryListDetails: {
    inventoryListId: number;
    onDelete: () => void;
    reload: () => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export function Main() {
  const { t, i18n } = useTranslation(["home"]);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

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
    dispatch(initializeSettings());
  }, [initDatabase]);

  useEffect(() => {
    const languageI18n = settings.language === "english" ? "en-GB" : "sr-Latn";
    i18n.changeLanguage(languageI18n);
  }, [settings.language]);

  return (
    <>
      {settings && (
        <PaperProvider
          theme={
            settings.theme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme
          }
        >
          <Suspense fallback={<Fallback />}>
            <NavigationContainer
              theme={
                settings.theme === "dark"
                  ? CombinedDarkTheme
                  : CombinedDefaultTheme
              }
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateNewAsset"
                  component={CreateNewAsset}
                  options={{
                    title: t("createNewAsset"),
                  }}
                  initialParams={{
                    reload: () => {},
                    asset: undefined,
                  }}
                />
                <Stack.Screen
                  name="AssetDetails"
                  component={AssetDetails}
                  options={{
                    title: t("assetDetails"),
                  }}
                  initialParams={{
                    asset: undefined,
                    onDelete: () => {},
                    reload: () => {},
                  }}
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
                <Stack.Screen
                  name="AssetsOnLocation"
                  component={AssetsOnLocation}
                  options={{
                    title: t("assetsOnLocation"),
                  }}
                  initialParams={{
                    location_id: undefined,
                  }}
                />
                <Stack.Screen
                  name="CreateNewInventoryList"
                  component={CreateNewInventoryList}
                  options={{
                    title: t("createNewInventoryList"),
                  }}
                  initialParams={{
                    reload: () => {},
                    inventoryList: undefined,
                  }}
                />
                <Stack.Screen
                  name="InventoryListDetails"
                  component={AssetDetails}
                  options={{
                    title: t("inventoryListDetails"),
                  }}
                  initialParams={{
                    inventoryListId: undefined,
                    onDelete: () => {},
                    reload: () => {},
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Suspense>
        </PaperProvider>
      )}
    </>
  );
}
