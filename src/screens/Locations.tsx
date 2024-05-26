import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View } from "react-native";
import { Modal, Portal, Searchbar, useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../reducers/store";
import { Location as LocationType } from "../types/Location";
import { Location } from "../components/Location";
import { getLocations, getLocationsByName } from "../db/locations";
import { itemsContainerStyles as styles, modalStyles } from "../styles/styles";
import { setHeader } from "../reducers/headerSlice";
import { CreateNewLocation } from "../components/CreateNewLocation";
import { ItemSeparator } from "../components/ItemSeparator";

export function Locations() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { t } = useTranslation("home");
  const theme = useTheme();
  const route = useRoute();
  const states = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();

  useEffect(() => {
    reload();
  }, [searchQuery]);

  const reload = () => {
    if (searchQuery.length > 0) {
      getLocationsByName(searchQuery).then((res) => {
        setLocations(res);
      });
    } else {
      getLocations().then((res) => {
        setLocations(res);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={route.name === t("locations") && states.filter}
          onDismiss={async () => dispatch(await setHeader("falsifyAll"))}
          contentContainerStyle={[
            {
              backgroundColor: theme.colors.background,
            },
            modalStyles.container,
          ]}
        >
          <View>
            <ScrollView>
              {/* {states.filter && (<FilterLocations setLocation={reloadByFilter} />)} */}
            </ScrollView>
          </View>
        </Modal>
      </Portal>

      {route.name === t("locations") && states.search && (
        <Searchbar
          style={{ margin: 10 }}
          placeholder={t("searchByName")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onClearIconPress={async () => {
            setSearchQuery("");
            dispatch(await setHeader("falsifyAll"));
          }}
        />
      )}

      {route.name === t("locations") && states.add ? (
        <CreateNewLocation reload={reload} />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={ItemSeparator}
          data={locations}
          renderItem={({ item }) => (
            <Location location={item} reload={reload} />
          )}
        />
      )}
    </View>
  );
}
