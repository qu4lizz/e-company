import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Asset } from "../components/Asset";
import { Asset as AssetType } from "../types/Asset";
import { getAssets } from "../db/asset";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "../reducers/store";
import { useTranslation } from "react-i18next";
import { Modal, Portal } from "react-native-paper";
import { CreateNewAsset } from "../components/CreateNewAsset";

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

  const { t } = useTranslation(["home"]);
  const route = useRoute();
  const states = useAppSelector((state) => state.header);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={
            route.name === t("assets") &&
            (states.filter || states.add || states.search)
          }
        >
          {states.add && <CreateNewAsset />}
        </Modal>
      </Portal>
      <FlatList
        data={assets}
        renderItem={({ item }) => <Asset asset={item} />}
      />
    </View>
  );
}
