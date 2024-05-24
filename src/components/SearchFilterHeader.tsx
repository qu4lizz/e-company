import { StyleSheet, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

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

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => console.log("add")}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log("search")}>
        <MaterialCommunityIcons
          name="magnify"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log("filter")}>
        <MaterialCommunityIcons
          name="filter-outline"
          size={28}
          color={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
}
