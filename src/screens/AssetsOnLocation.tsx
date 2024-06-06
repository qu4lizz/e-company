import { View } from "react-native";
import { RootStackParamList } from "../components/Main";
import { RouteProp, useRoute } from "@react-navigation/native";
import { itemsContainerStyles } from "../styles/styles";
import { FlatList } from "react-native-gesture-handler";
import { ItemSeparator } from "../components/ItemSeparator";
import { Asset } from "../components/Asset";
import { useEffect, useState } from "react";
import { Asset as AssetType } from "../types/Asset";
import { getAssetsByLocationId } from "../db/assets";

type AssetsOnLocationProps = RouteProp<RootStackParamList, "AssetsOnLocation">;

export function AssetsOnLocation() {
  const [assets, setAssets] = useState<AssetType[]>([]);

  const route = useRoute<AssetsOnLocationProps>();
  const { location_id } = route.params;

  const reload = () => {
    getAssetsByLocationId(location_id).then((res) => {
      setAssets(res);
    });
  };

  useEffect(() => {
    if (location_id) {
      reload();
    }
  }, [location_id]);

  return (
    <View style={itemsContainerStyles.container}>
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={ItemSeparator}
        data={assets}
        renderItem={({ item }) => <Asset asset={item} reload={reload} />}
      />
    </View>
  );
}
