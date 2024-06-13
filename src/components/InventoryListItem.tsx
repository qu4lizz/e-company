import { Pressable, ScrollView, View } from "react-native";
import { iconSize, modalStyles, singleItemStyles } from "../styles/styles";
import { Modal, Portal, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AreYouSure } from "./AreYouSure";
import { Text } from "react-native-paper";
import { InventoryListItemDetails } from "../types/InventoryListItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { deleteInventoryListItem } from "../db/inventoryListItems";

interface Props {
  inventoryListItem?: any;
  onDelete: any;
  inventoryListItemFormatted?: InventoryListItemDetails;
  isEditing?: boolean;
}

export function InventoryListItem({
  inventoryListItem,
  onDelete,
  inventoryListItemFormatted,
  isEditing,
}: Props) {
  const theme = useTheme();
  const { t } = useTranslation(["home"]);

  const [isDeleting, setDelete] = useState(false);

  const deleteItem = () => {
    const id = inventoryListItem?.id || inventoryListItemFormatted?.id;
    deleteInventoryListItem(id).then(() => {
      setDelete(false);
      onDelete();
    });
  };

  return (
    <View
      style={[
        singleItemStyles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
    >
      <Portal>
        <Modal
          visible={isDeleting}
          onDismiss={() => setDelete(false)}
          contentContainerStyle={[
            modalStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View>
            <ScrollView>
              <AreYouSure
                onDelete={deleteItem}
                onCancel={() => setDelete(false)}
              />
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      <View style={singleItemStyles.textFormat}>
        <Text variant="titleMedium">
          {t("assetName")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem
              ? inventoryListItem.asset.name
              : inventoryListItemFormatted?.asset.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("currentLocation")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem
              ? inventoryListItem.asset.location.name
              : inventoryListItemFormatted?.current_location.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("newLocation")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem
              ? inventoryListItem.newLocation.name
              : inventoryListItemFormatted?.new_location.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("currentEmployee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem
              ? inventoryListItem.asset.employee.name
              : inventoryListItemFormatted?.current_employee.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("newEmployee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem
              ? inventoryListItem.newEmployee.name
              : inventoryListItemFormatted?.new_employee.name}
          </Text>
        </Text>
      </View>
      {isEditing && (
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
      )}
    </View>
  );
}
