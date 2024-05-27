import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Location as LocationType } from "../types/Location";
import { Location } from "../components/Location";
import {
  getLocations,
  getLocationsByAddress,
  getLocationsByName,
} from "../db/locations";
import {
  itemsContainerStyles as styles,
  searchbarStyles,
} from "../styles/styles";
import { setHeader } from "../reducers/headerSlice";
import { ItemSeparator } from "../components/ItemSeparator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/Main";

export type CreateNewLocationNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateNewLocation"
>;

export function Locations() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterQuery, setFilterQuery] = React.useState("");

  const navigation = useNavigation<CreateNewLocationNavigationProp>();
  const { t } = useTranslation(["home"]);
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    reload();
  }, [searchQuery, filterQuery]);

  const reload = () => {
    if (searchQuery.length > 0) {
      getLocationsByName(searchQuery).then((res) => {
        setLocations(res);
      });
    } else if (filterQuery.length > 0) {
      getLocationsByAddress(filterQuery).then((res) => {
        setLocations(res);
      });
    } else {
      getLocations().then((res) => {
        setLocations(res);
      });
    }
  };

  useEffect(() => {
    if (isFocused && states.add) {
      navigation.navigate("CreateNewLocation", { reload });
      dispatchFalse();
    }
  }, [isFocused, states.add]);

  const dispatchFalse = async () => {
    dispatch(await setHeader("falsifyAll"));
  };

  return (
    <View style={styles.container}>
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
      {isFocused && states.filter && (
        <Searchbar
          style={searchbarStyles.container}
          placeholder={t("filterByAddress")}
          onChangeText={setFilterQuery}
          value={filterQuery}
          onClearIconPress={async () => {
            setFilterQuery("");
            dispatch(await setHeader("falsifyAll"));
          }}
        />
      )}

      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={locations}
        renderItem={({ item }) => <Location location={item} reload={reload} />}
      />
    </View>
  );
}
