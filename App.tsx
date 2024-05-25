import { PaperProvider } from "react-native-paper";
import { Main } from "./src/components/Main";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import "./src/translations/translation";
import { Suspense } from "react";
import { Fallback } from "./src/screens/Fallback";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <Suspense fallback={<Fallback />}>
        <Main />
      </Suspense>
    </PaperProvider>
  );
}
