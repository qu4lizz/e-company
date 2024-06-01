import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Asset } from "../components/Asset";
import { Asset as AssetType } from "../types/Asset";
import { getAssets, getAssetsByName } from "../db/asset";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { useTranslation } from "react-i18next";
import { Modal, Portal, Searchbar, useTheme } from "react-native-paper";
import { setHeader } from "../reducers/headerSlice";
import {
  modalStyles,
  searchbarStyles,
  itemsContainerStyles,
} from "../styles/styles";
import { FilterAssets } from "../components/FilterAssets";
import { ItemSeparator } from "../components/ItemSeparator";
import { RootStackParamList } from "../components/Main";
import { StackNavigationProp } from "@react-navigation/stack";

type AssetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateNewAsset",
  "AssetsOnLocation"
>;

export function Assets() {
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const navigation = useNavigation<AssetNavigationProp>();
  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    reload();
  }, [searchQuery]);

  const reload = () => {
    if (searchQuery.length > 0) {
      getAssetsByName(searchQuery).then((res) => {
        setAssets(res);
      });
    } else {
      getAssets().then((res) => {
        setAssets(res);
      });
    }
  };

  useEffect(() => {
    if (isFocused && states.add) {
      navigation.navigate("CreateNewAsset", { reload });
      dispatchFalse();
    }
  }, [isFocused, states.add]);

  const dispatchFalse = async () => {
    dispatch(await setHeader("falsifyAll"));
  };

  return (
    <View style={itemsContainerStyles.container}>
      <Portal>
        <Modal
          visible={isFocused && (states.filter || states.add)}
          onDismiss={async () => {
            await dispatch(await setHeader("falsifyAll"));
          }}
          contentContainerStyle={[
            { backgroundColor: theme.colors.background },
            modalStyles.container,
          ]}
        >
          <View>
            <ScrollView>
              {states.filter && <FilterAssets setAssets={setAssets} />}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      {isFocused && states.search && (
        <Searchbar
          style={searchbarStyles.container}
          placeholder={t("searchByName")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onClearIconPress={async () => {
            setSearchQuery("");
            dispatch(await setHeader("falsifyAll"));
          }}
        />
      )}
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={assets}
        renderItem={({ item }) => <Asset asset={item} reload={reload} />}
      />
    </View>
  );
}
