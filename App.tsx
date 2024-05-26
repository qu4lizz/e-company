import { Main } from "./src/components/Main";
import "./src/translations/translation";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
