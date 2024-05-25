import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Asset } from "../components/Asset";
import { Asset as AssetType } from "../types/Asset";
import { getAssets } from "../db/asset";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export function Assets() {
  const [assets, setAssets] = useState<AssetType[]>([]);

  useEffect(() => {
    getAssets().then((res) => setAssets(res));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({ item }) => <Asset asset={item} />}
      />
    </View>
  );
}
