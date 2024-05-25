import { StyleSheet, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { setHeader } from "../reducers/headerSlice";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: "100%",
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export function SearchFilterHeader() {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await dispatch(await setHeader("add"));
        }}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await dispatch(await setHeader("search"));
        }}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await dispatch(await setHeader("filter"));
        }}
      >
        <MaterialCommunityIcons
          name="filter-outline"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
}
