import React from "react";
import { View, StyleSheet } from "react-native";

const MarginLayout = (Component: any) => (props: any) => {
  return (
    <View style={styles.container}>
      <Component {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default MarginLayout;
