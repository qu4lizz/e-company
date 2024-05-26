import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../reducers/store";
import * as yup from "yup";
import { useState } from "react";
import { createLocation, updateLocation } from "../db/locations";
import { setHeader } from "../reducers/headerSlice";
import { useFormik } from "formik";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { createNewStyles, mapStyles } from "../styles/styles";
import { Button, Text, TextInput } from "react-native-paper";
import mapCenter from "../../assets/mapCenter.json";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { getAddressFromCoordinates } from "../utils/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./Main";

type CreateNewLocationRouteProp = RouteProp<
  RootStackParamList,
  "CreateNewLocation"
>;

export function CreateNewLocation() {
  const route = useRoute<CreateNewLocationRouteProp>();
  const { reload, location } = route.params;

  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [addressChanged, setAddressChanged] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const editing = location ? true : false;

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("nameRequired")),
    coordinate: yup.object().required(t("addressRequired")),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let address = form.values.address;
    if (addressChanged) {
      address = await getAddressFromCoordinates(
        form.values.coordinate.latitude!,
        form.values.coordinate.longitude!
      );
    }

    if (address.length === 0) {
      setAddressError(true);
      setLoading(false);
      return;
    }

    if (editing) {
      updateLocation({
        id: location!.id,
        name: form.values.name,
        address,
        latitude: form.values.coordinate.latitude!,
        longitude: form.values.coordinate.longitude!,
      })
        .then(async () => {
          reload();
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        });
    } else {
      createLocation({
        name: form.values.name,
        address,
        latitude: form.values.coordinate.latitude!,
        longitude: form.values.coordinate.longitude!,
      })
        .then(async () => {
          dispatch(await setHeader("falsifyAll"));
          reload();
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        });
    }
  };

  const initialValues = {
    name: editing ? location!.name : "",
    address: editing ? location!.address : "",
    coordinate: editing
      ? { latitude: location!.latitude, longitude: location!.longitude }
      : { latitude: mapCenter.lat, longitude: mapCenter.lng },
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View
      style={[createNewStyles.container, { marginBottom: 20, marginTop: 20 }]}
    >
      <View style={createNewStyles.inputView}>
        <TextInput
          style={{ width: "100%" }}
          mode="outlined"
          label={t("name")}
          value={form.values.name}
          onChangeText={form.handleChange("name")}
          error={form.touched.name && !!form.errors.name}
        />
        {form.touched.name && form.errors.name && (
          <Text>{form.errors.name}</Text>
        )}
      </View>
      <View style={mapStyles.container}>
        <MapView
          style={mapStyles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location ? location.latitude : mapCenter.lat,
            longitude: location ? location.longitude : mapCenter.lng,
            latitudeDelta: 4,
            longitudeDelta: 1,
          }}
        >
          <Marker
            draggable={true}
            coordinate={form.values.coordinate}
            onDragEnd={(e) => {
              setAddressChanged(true);
              setAddressError(false);
              form.setFieldValue("coordinate", e.nativeEvent.coordinate);
            }}
          />
        </MapView>
        {addressError && (
          <Text variant="titleLarge">{t("selectLocationRequired")}</Text>
        )}
      </View>
      <Button mode="contained" loading={loading} onPress={onSubmit}>
        {editing ? t("edit") : t("create")}
      </Button>
    </View>
  );
}
