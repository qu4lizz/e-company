import { useTranslation } from "react-i18next";
import { Location } from "../types/Location";
import { useAppDispatch } from "../reducers/store";
import * as yup from "yup";
import { useState } from "react";
import { createLocation, updateLocation } from "../db/locations";
import { setHeader } from "../reducers/headerSlice";
import { useFormik } from "formik";
import MapView, { LatLng, Marker } from "react-native-maps";
import { View } from "react-native";
import { createNewStyles, mapStyles } from "../styles/styles";
import { Button, Text, TextInput } from "react-native-paper";
import mapCenter from "../../assets/mapCenter.json";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { getAddressFromCoordinates } from "../utils/utils";

interface Props {
  reload: () => void;
  setEdit?: any;
  location?: Location;
}

export function CreateNewLocation({ reload, setEdit, location }: Props) {
  const { t } = useTranslation("home");
  const dispatch = useAppDispatch();

  const [coordinate, setCoordinate] = useState<LatLng>({
    latitude: mapCenter.lat,
    longitude: mapCenter.lng,
  });

  const editing = location ? true : false;

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("nameRequired")),
    address: yup.string().required(t("addressRequired")),
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);

    const address = await getAddressFromCoordinates(
      coordinate.latitude,
      coordinate.longitude
    );

    if (editing) {
      updateLocation({
        id: location!.id,
        name: form.values.name,
        address,
        latitude: form.values.latitude,
        longitude: form.values.longitude,
      })
        .then(async () => {
          setEdit(false);
          reload();
        })
        .finally(() => setLoading(false));
      return;
    } else {
      createLocation({
        name: form.values.name,
        address,
        latitude: form.values.latitude,
        longitude: form.values.longitude,
      })
        .then(async () => {
          dispatch(await setHeader("falsifyAll"));
          reload();
        })
        .finally(() => setLoading(false));
    }
  };

  const initialValues = {
    name: editing ? location!.name : "",
    address: editing ? location!.address : "",
    latitude: editing ? location!.latitude : 0,
    longitude: editing ? location!.longitude : 0,
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
      <Text variant="titleLarge">{t("createNewLocation")}</Text>
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
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
            latitudeDelta: 4,
            longitudeDelta: 1,
          }}
        >
          <Marker
            draggable={true}
            coordinate={coordinate}
            onDragEnd={(e) => {
              setCoordinate(e.nativeEvent.coordinate);
              form.setFieldValue("latitude", e.nativeEvent.coordinate.latitude);
              form.setFieldValue(
                "longitude",
                e.nativeEvent.coordinate.longitude
              );
            }}
          />
        </MapView>
      </View>
      <Button mode="contained" loading={loading} onPress={onSubmit}>
        {editing ? t("edit") : t("create")}
      </Button>
    </View>
  );
}
