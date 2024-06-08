import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Main";
import { InventoryList as InventoryListType } from "../types/InventoryList";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { iconSize, singleItemStyles } from "../styles/styles";
import { useTheme } from "react-native-paper";
import { deleteInventoryList } from "../db/inventoryLists";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../utils/utils";
import { useTranslation } from "react-i18next";

type InventoryListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InventoryListDetails"
>;

interface Props {
  inventoryList: InventoryListType;
  reload: () => void;
}

export function InventoryList({ inventoryList, reload }: Props) {
  const navigation = useNavigation<InventoryListNavigationProp>();
  const theme = useTheme();
  const { t } = useTranslation(["home"]);

  const onDelete = () => {
    deleteInventoryList(inventoryList.id!).then(() => {
      reload();
    });
  };

  return (
    <Pressable
      style={[
        singleItemStyles.container,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
      onPress={() =>
        navigation.navigate("InventoryListDetails", {
          inventoryListId: inventoryList.id!,
          reload,
          onDelete,
        })
      }
    >
      <View style={singleItemStyles.textFormat}>
        <Text variant="titleMedium">
          {t("name")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{inventoryList.name}</Text>
        </Text>
        <Text variant="titleMedium">
          {t("createdAt")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {formatDate(inventoryList.created_at, "datetime")}
          </Text>
        </Text>
      </View>

      <MaterialCommunityIcons
        name="arrow-right"
        size={iconSize}
        color={theme.colors.primary}
      />
    </Pressable>
  );
}
