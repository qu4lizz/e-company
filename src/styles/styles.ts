import { StyleSheet } from "react-native";

export const createNewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  inputView: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const radioStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
});

export const singleItemStyles = StyleSheet.create({
  textFormat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    width: "80%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
    width: "100%",
  },
  iconsContainer: {
    display: "flex",
    gap: 10,
  },
  textContainer: {
    display: "flex",
  },
});

export const modalStyles = StyleSheet.create({
  container: {
    padding: 20,
    width: "85%",
    alignSelf: "center",
  },
});

export const itemsContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});
