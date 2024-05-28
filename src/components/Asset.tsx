import { Pressable, StyleSheet, View } from "react-native";
import { Asset as AssetType } from "../types/Asset";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { deleteEmployee } from "../db/employee";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconSize, singleItemStyles } from "../styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Main";
import { useNavigation } from "@react-navigation/native";

type AssetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AssetDetails"
>;

interface AssetProps {
  asset: AssetType;
  reload: () => void;
}

export function Asset({ asset, reload }: AssetProps) {
  const { t } = useTranslation(["home"]);
  const navigation = useNavigation<AssetNavigationProp>();
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
        singleItemStyles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
      onPress={() => navigation.navigate("AssetDetails", { asset })}
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
      <View style={[singleItemStyles.textFormat, { width: "50%" }]}>
        <Text variant="titleMedium" style={{ fontWeight: "700" }}>
          {asset?.name}
        </Text>
        <Text variant="bodyMedium">{asset?.description}</Text>
      </View>
      <MaterialCommunityIcons
        name="arrow-right"
        size={iconSize}
        color={theme.colors.primary}
      />
    </Pressable>
  );
}
