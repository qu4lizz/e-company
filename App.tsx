import { PaperProvider } from "react-native-paper";
import { Main } from "./src/components/Main";
import "./src/translations/translation";
import { Suspense } from "react";
import { Fallback } from "./src/screens/Fallback";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import { CombinedDefaultTheme } from "./src/themes";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={CombinedDefaultTheme}>
        <Suspense fallback={<Fallback />}>
          <Main />
        </Suspense>
      </PaperProvider>
    </Provider>
  );
}
