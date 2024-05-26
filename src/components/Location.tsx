import { useTranslation } from "react-i18next";
import { Location as LocationType } from "../types/Location";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { deleteLocation } from "../db/locations";
import { Pressable, ScrollView, View } from "react-native";
import {
  singleItemStyles as styles,
  modalStyles,
  iconSize,
} from "../styles/styles";
import { AreYouSure } from "./AreYouSure";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Main";
import { useNavigation } from "@react-navigation/native";
import { CreateNewLocationNavigationProp } from "../screens/Locations";

interface Props {
  location: LocationType;
  reload: () => void;
}

export function Location({ location, reload }: Props) {
  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const navigation = useNavigation<CreateNewLocationNavigationProp>();

  const [isDeleting, setDelete] = useState(false);

  const onDelete = () => {
    deleteLocation(location.id!).then(() => setDelete(false));
    reload();
  };

  const onDeleteCancel = () => {
    setDelete(false);
  };

  const onEdit = () => {
    navigation.navigate("CreateNewLocation", {
      reload,
      location,
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
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
          style={[{ borderColor: theme.colors.primary }, styles.icons]}
          onPress={onEdit}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={iconSize}
            color={theme.colors.primary}
          />
        </Pressable>
        <Pressable
          style={[{ borderColor: theme.colors.primary }, styles.icons]}
          onPress={() => setDelete(true)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={iconSize}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}
