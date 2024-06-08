import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { InventoryList as InventoryListType } from "../types/InventoryList";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import {
  getInventoryLists,
  getInventoryListsByName,
} from "../db/inventoryLists";
import { setHeader } from "../reducers/headerSlice";
import {
  itemsContainerStyles,
  modalStyles,
  searchbarStyles,
} from "../styles/styles";
import { Modal, Portal, Searchbar } from "react-native-paper";
import { ItemSeparator } from "../components/ItemSeparator";
import { InventoryList } from "../components/InventoryList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/Main";
import FilterInventoryLists from "../components/FilterInventoryLists";

type InventoryListProp = StackNavigationProp<
  RootStackParamList,
  "CreateNewInventoryList"
>;

export function InventoryLists() {
  const [inventoryLists, setInventoryLists] = useState<InventoryListType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<InventoryListProp>();
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
      getInventoryListsByName(searchQuery).then((res) => {
        setInventoryLists(res);
      });
    } else {
      getInventoryLists().then((res) => {
        setInventoryLists(res);
      });
    }
  };

  useEffect(() => {
    if (isFocused && states.add) {
      navigation.navigate("CreateNewInventoryList", { reload });
      dispatchFalse();
    }
  }, [isFocused, states.add]);

  const dispatchFalse = async () => {
    dispatch(await setHeader("falsifyAll"));
  };

  const reloadByFilter = async (inventoryLists: InventoryListType[]) => {
    setInventoryLists(inventoryLists);
    dispatchFalse();
  };

  return (
    <View style={itemsContainerStyles.container}>
      <Portal>
        <Modal
          visible={isFocused && states.filter}
          onDismiss={() => {
            dispatchFalse();
          }}
          contentContainerStyle={[
            modalStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View>
            <ScrollView>
              {states.filter && (
                <FilterInventoryLists setInventoryLists={reloadByFilter} />
              )}
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
          onClearIconPress={() => {
            setSearchQuery("");
            dispatchFalse();
          }}
        />
      )}
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={inventoryLists}
        renderItem={({ item }) => (
          <InventoryList inventoryList={item} reload={reload} />
        )}
      />
    </View>
  );
}
