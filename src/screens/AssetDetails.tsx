import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "../components/Main";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import {
  assetDetails,
  iconSize,
  mapStyles,
  modalStyles,
  singleItemStyles,
} from "../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Modal, Portal, Text } from "react-native-paper";
import { formatDate } from "../utils/utils";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { Location } from "../types/Location";
import { getLocationById } from "../db/locations";
import { getEmployeeById } from "../db/employee";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StackNavigationProp } from "@react-navigation/stack";
import { AreYouSure } from "../components/AreYouSure";
import { Asset } from "../types/Asset";
import { getAssetById } from "../db/assets";

type AssetDetailsProps = RouteProp<RootStackParamList, "AssetDetails">;

type AssetProp = StackNavigationProp<
  RootStackParamList,
  "AssetsOnLocation",
  "CreateNewAsset"
>;

export function AssetDetails() {
  const route = useRoute<AssetDetailsProps>();
  const { asset, onDelete, reload } = route.params;
  const navigation = useNavigation<AssetProp>();

  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const isFocused = useIsFocused();

  const [assetObj, setAssetObj] = useState<Asset>(asset);
  const [location, setLocation] = useState<Location>();
  const [employee, setEmployee] = useState<Employee>();

  const [isDeleting, setDelete] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const fetchAsset = async () => {
        const assetData = await getAssetById(asset.id!);
        setAssetObj(assetData);

        const locationData = await getLocationById(assetData.location_id);
        const employeeData = await getEmployeeById(assetData.employee_id);

        setLocation(locationData);
        setEmployee(employeeData);
      };

      fetchAsset();
    }
  }, [isFocused, asset]);

  const openAssetsOnLocation = () => {
    navigation.navigate("AssetsOnLocation", {
      location_id: assetObj.location_id,
    });
  };

  const onEdit = () => {
    navigation.navigate("CreateNewAsset", {
      reload,
      asset: assetObj,
    });
  };

  return (
    <ScrollView contentContainerStyle={assetDetails.container}>
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
            <AreYouSure onDelete={onDelete} onCancel={() => setDelete(false)} />
          </ScrollView>
        </Modal>
      </Portal>
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
      <View style={assetDetails.content}>
        <Text variant="titleLarge">
          {t("name")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{assetObj.name}</Text>
        </Text>
        {assetObj.image && (
          <Avatar.Image
            size={256}
            source={{
              uri: `data:image/jpeg;base64,${assetObj.image}`,
            }}
          />
        )}

        <Text variant="bodyLarge">
          {t("description")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{assetObj.description}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("barcode")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{assetObj.barcode}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("price")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{assetObj.price}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("createdAt")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {formatDate(assetObj.created_at!, "datetime")}
          </Text>
        </Text>
        <Text variant="bodyLarge">
          {t("employee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{employee?.name}</Text>
        </Text>
        <View style={assetDetails.content}>
          <Text variant="bodyLarge">
            {t("location")}:{" "}
            <Text style={{ fontWeight: "bold" }}>{location?.name}</Text>
          </Text>
          {location && (
            <View style={mapStyles.container}>
              <MapView
                style={[mapStyles.map, { height: 500 }]}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: location?.latitude || 0,
                  longitude: location?.longitude || 0,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location?.latitude || 0,
                    longitude: location?.longitude || 0,
                  }}
                  onPress={openAssetsOnLocation}
                />
              </MapView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
