import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { RootStackParamList } from "../components/Main";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { InventoryListDetails as InventoryListDetailsType } from "../types/InventoryList";
import { getInventoryListById } from "../db/inventoryLists";
import { Modal, Portal } from "react-native-paper";
import {
  assetDetails,
  iconSize,
  inventoryDetails,
  modalStyles,
  singleItemStyles,
} from "../styles/styles";
import { AreYouSure } from "../components/AreYouSure";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "react-native-paper";
import { formatDate } from "../utils/utils";
import { InventoryListItem } from "../components/InventoryListItem";
import { ItemSeparator } from "../components/ItemSeparator";
import { StackNavigationProp } from "@react-navigation/stack";
import { getInventoryListItems } from "../db/inventoryListItems";
import { getLocations } from "../db/locations";

type InventoryDetailsProps = RouteProp<
  RootStackParamList,
  "InventoryListDetails"
>;

type InventoryListProps = StackNavigationProp<
  RootStackParamList,
  "InventoryListDetails"
>;

export function InventoryListDetails() {
  const route = useRoute<InventoryDetailsProps>();
  const navigation = useNavigation<InventoryListProps>();
  const { inventoryListId, onDelete, reload } = route.params;

  const [inventoryList, setInventoryList] =
    useState<InventoryListDetailsType>();

  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const isFocused = useIsFocused();

  const [isDeleting, setDelete] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getInventoryListById(inventoryListId).then((res) => {
        setInventoryList(res);
      });
    }
  }, [isFocused, inventoryListId]);

  const onEdit = () => {};

  const onDeleteDetails = () => {
    onDelete();
    navigation.goBack();
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={isDeleting}
          onDismiss={() => setDelete(false)}
          contentContainerStyle={[
            modalStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView>
            <AreYouSure
              onDelete={onDeleteDetails}
              onCancel={() => setDelete(false)}
            />
          </ScrollView>
        </Modal>
      </Portal>
      <FlatList
        data={inventoryList?.assets}
        renderItem={({ item }) => (
          <InventoryListItem
            onDelete={() => setDelete(true)}
            inventoryListItemFormatted={item}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View style={inventoryDetails.container}>
            <View style={assetDetails.iconsHeader}>
              <Pressable
                style={[
                  { borderColor: theme.colors.primary },
                  singleItemStyles.icons,
                ]}
                onPress={onEdit}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={iconSize}
                  color={theme.colors.primary}
                />
              </Pressable>
              <Pressable
                style={[
                  { borderColor: theme.colors.primary },
                  singleItemStyles.icons,
                ]}
                onPress={() => setDelete(true)}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={iconSize}
                  color={theme.colors.primary}
                />
              </Pressable>
            </View>
            <View>
              <Text variant="titleLarge" style={{ textAlign: "center" }}>
                {inventoryList?.name}
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                {formatDate(inventoryList?.created_at!, "datetime")}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}
