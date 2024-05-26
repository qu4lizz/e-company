import { useTranslation } from "react-i18next";
import { Location as LocationType } from "../types/Location";
import { Divider, Modal, Portal, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { deleteLocation } from "../db/locations";
import { Pressable, ScrollView, View } from "react-native";
import { singleItemStyles as styles, modalStyles } from "../styles/styles";
import { AreYouSure } from "./AreYouSure";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  location: LocationType;
  reload: () => void;
}

export function Location({ location, reload }: Props) {
  const { t } = useTranslation("home");
  const theme = useTheme();

  const [isEditing, setEdit] = useState(false);
  const [isDeleting, setDelete] = useState(false);

  const onDelete = () => {
    deleteLocation(location.id!).then(() => setDelete(false));
    reload();
  };

  const onDeleteCancel = () => {
    setDelete(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <Portal>
        <Modal
          visible={isDeleting}
          onDismiss={() => {
            setDelete(false);
          }}
          contentContainerStyle={[
            modalStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View>
            <ScrollView>
              {isDeleting && (
                <AreYouSure onDelete={onDelete} onCancel={onDeleteCancel} />
              )}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      <View style={styles.textFormat}>
        <Text variant="titleMedium">
          {t("name")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{location.name}</Text>
        </Text>

        <Text variant="titleMedium">
          {t("address")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{location.address}</Text>
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable
          style={{
            borderColor: theme.colors.primary,
            borderRadius: 10,
            borderWidth: 2,
            padding: 5,
          }}
          onPress={() => setEdit(true)}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={30}
            color={theme.colors.primary}
          />
        </Pressable>
        <Pressable
          style={{
            borderColor: theme.colors.primary,
            borderRadius: 10,
            borderWidth: 2,
            padding: 5,
          }}
          onPress={() => setDelete(true)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}
