import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "../components/Main";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../reducers/store";
import { Pressable, ScrollView, View } from "react-native";
import {
  assetDetails,
  iconSize,
  mapStyles,
  singleItemStyles,
} from "../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Text } from "react-native-paper";
import { formatDate } from "../utils/utils";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { Location } from "../types/Location";
import { getLocationById } from "../db/locations";
import { getEmployeeById } from "../db/employee";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type AssetDetailsProps = RouteProp<RootStackParamList, "AssetDetails">;

export function AssetDetails() {
  const route = useRoute<AssetDetailsProps>();
  const { asset } = route.params;
  const navigation = useNavigation();

  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<Location>();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    setLocation(getLocationById(asset.location_id));

    setEmployee(getEmployeeById(asset.employee_id));
  }, []);

  return (
    <ScrollView contentContainerStyle={assetDetails.container}>
      <View style={assetDetails.iconsHeader}>
        <Pressable
          style={[
            { borderColor: theme.colors.primary },
            singleItemStyles.icons,
          ]}
          onPress={() => console.log("ed")}
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
          onPress={() => console.log("del")}
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
          {t("name")}: <Text style={{ fontWeight: "bold" }}>{asset.name}</Text>
        </Text>
        {asset.image && (
          <Avatar.Image
            size={256}
            source={{
              uri: `data:image/jpeg;base64,${asset.image}`,
            }}
          />
        )}

        <Text variant="bodyLarge">
          {t("description")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{asset.description}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("barcode")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{asset.barcode}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("price")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{asset.price}</Text>
        </Text>
        <Text variant="bodyLarge">
          {t("createdAt")}:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {formatDate(asset.created_at!, "datetime")}
          </Text>
        </Text>
        <Text variant="bodyLarge">
          {t("employee")}:{" "}
          <Text style={{ fontWeight: "bold" }}>{employee?.name}</Text>
        </Text>
        <View style={assetDetails.content}>
          <Text variant="bodyLarge">{t("location")}:</Text>
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
                  onPress={() => console.log("marker")}
                />
              </MapView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
