import { Pressable, StyleSheet, View } from "react-native";
import { Asset as AssetType } from "../types/Asset";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { deleteEmployee } from "../db/employee";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 20,
    paddingRight: 90,
  },
});

interface AssetProps {
  asset: AssetType;
  reload: () => void;
}

export function Asset({ asset, reload }: AssetProps) {
  const { t } = useTranslation(["home"]);
  const theme = useTheme();

  const [isEditing, setEdit] = useState(false);
  const [isDeleting, setDelete] = useState(false);

  const onDelete = () => {
    deleteEmployee(asset.id!).then(() => setDelete(false));
    reload();
  };

  const onDeleteCancel = () => {
    setDelete(false);
  };

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
      onPress={() => console.log("press")}
    >
      <View>
        {asset.image && (
          <Avatar.Image
            size={96}
            source={{
              uri: `data:image/jpeg;base64,${asset.image}`,
            }}
          />
        )}
      </View>
      <View>
        <Text variant="titleMedium" style={{ fontWeight: "700" }}>
          {asset?.name}
        </Text>
        <Text variant="bodyMedium">{asset?.description}</Text>
      </View>
    </Pressable>
  );
}
