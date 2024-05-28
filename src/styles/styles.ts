import { Dimensions, StyleSheet } from "react-native";

export const createNewStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 10,
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
  imageUpload: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
  icons: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const iconSize = 26;

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
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});

export const searchbarStyles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  icon: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const selectStyles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export const cameraStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  camera: {
    flexGrow: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export const assetDetails = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  iconsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
});
