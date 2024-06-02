import { Pressable, View } from "react-native";
import { Asset as AssetType } from "../types/Asset";
import { Avatar, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconSize, singleItemStyles } from "../styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Main";
import { useNavigation } from "@react-navigation/native";
import { deleteAsset } from "../db/asset";

type AssetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AssetDetails"
>;

interface AssetProps {
  asset: AssetType;
  reload: () => void;
}

export function Asset({ asset, reload }: AssetProps) {
  const navigation = useNavigation<AssetNavigationProp>();
  const theme = useTheme();

  const onDelete = () => {
    deleteAsset(asset.id!).then(() => {
      reload();
      navigation.goBack();
    });
  };

  return (
    <Pressable
      style={[
        singleItemStyles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
      onPress={() =>
        navigation.navigate("AssetDetails", { asset, onDelete, reload })
      }
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
