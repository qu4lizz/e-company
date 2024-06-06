import { View } from "react-native";
import { modalStyles, singleItemStyles } from "../styles/styles";
import { Modal, Portal, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AreYouSure } from "./AreYouSure";
import { Text } from "react-native-paper";

interface Props {
  inventoryListItem: any;
  onDelete: any;
}

export function InventoryListItem({ inventoryListItem, onDelete }: Props) {
  const theme = useTheme();
  const { t } = useTranslation(["home"]);

  const [isDeleting, setDelete] = useState(false);

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
                onDelete={onDelete}
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
            {inventoryListItem.asset.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("currentLocation")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem.asset.location.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("newLocation")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem.newLocation.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("currentEmployee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem.asset.employee.name}
          </Text>
        </Text>
        <Text variant="titleMedium">
          {t("newEmployee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {inventoryListItem.newEmployee.name}
          </Text>
        </Text>
      </View>
    </View>
  );
}
