import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export function ItemSeparator() {
  return <View style={styles.separator} />;
}
