import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../reducers/store";
import { useEffect, useState } from "react";
import { createAsset, updateAsset } from "../db/assets";
import { setHeader } from "../reducers/headerSlice";
import { Pressable, View } from "react-native";
import { cameraStyles, createNewStyles as styles } from "../styles/styles";
import { Avatar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { getLocationById, getLocations } from "../db/locations";
import { getEmployeeById, getEmployees } from "../db/employee";
import * as ImagePicker from "expo-image-picker";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../components/Main";
import { Select } from "../components/Select";
import { BarcodeScanner } from "../components/BarcodeScanner";

type CreateNewAssetRouteProp = RouteProp<RootStackParamList, "CreateNewAsset">;

export function CreateNewAsset() {
  const route = useRoute<CreateNewAssetRouteProp>();
  const { reload, asset } = route.params;
  const navigation = useNavigation();

  const { t } = useTranslation(["home"]);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const editing = asset ? true : false;

  const [locations, setLocations] = useState<any>([]);
  const [employees, setEmployees] = useState<any>([]);

  useEffect(() => {
    navigation.setOptions({
      title: editing ? t("editAsset") : t("createNewAsset"),
    });

    getLocations().then((res) => {
      setLocations(res);
    });
    getEmployees().then((res) => {
      setEmployees(res);
    });
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("assetNameRequired")),
    description: yup.string().required(t("assetDescriptionRequired")),
    barcode: yup
      .string()
      .matches(/^\d{12,13}$/, t("assetBarcodeInvalid"))
      .required(t("assetBarcodeRequired")),
    price: yup
      .number()
      .min(0, t("assetPriceInvalid"))
      .required(t("assetPriceRequired")),
    location: yup.object().required(t("assetLocationRequired")),
    employee: yup.object().required(t("assetEmployeeRequired")),
    image: yup.string().required(t("assetImageRequired")),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    if (editing) {
      const obj = {
        id: asset!.id,
        name: form.values.name,
        description: form.values.description,
        barcode: form.values.barcode,
        price: form.values.price,
        location_id: form.values.location!.id!,
        employee_id: form.values.employee!.id!,
        image: form.values.image as string,
      };
      updateAsset(obj)
        .then(() => {
          reload();
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        });
    } else {
      const created_at = new Date().toISOString();

      createAsset({
        name: form.values.name,
        description: form.values.description,
        barcode: form.values.barcode,
        price: form.values.price,
        created_at,
        location_id: form.values.location!.id!,
        employee_id: form.values.employee!.id!,
        image: form.values.image! as string,
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
    name: asset?.name || "",
    description: asset?.description || "",
    barcode: asset?.barcode || "",
    price: asset?.price || -1,
    location: asset?.location_id ? getLocationById(asset?.location_id) : null,
    employee: asset?.employee_id ? getEmployeeById(asset?.employee_id) : null,
    image: asset?.image || "",
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      form.setFieldValue("image", result.assets[0].base64);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      form.setFieldValue("image", result.assets[0].base64);
    }
  };

  const [isScanning, setIsScanning] = useState(false);

  const onBarcodeScanned = async (data: BarcodeScanningResult) => {
    form.setFieldValue("barcode", data.data);
    setIsScanning(false);
  };

  return (
    <View style={styles.container}>
      {!isScanning ? (
        <View style={styles.container}>
          <View style={styles.inputView}>
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
          <Select
            text={t("location")}
            fieldValueName="location"
            data={locations}
            showError={form.touched.location && !!form.errors.location}
            error={form.errors.location}
            value={form.values.location}
            setValue={form.setFieldValue}
            id={form.values.location?.id}
          />
          <Select
            text={t("employee")}
            fieldValueName="employee"
            data={employees}
            showError={form.touched.employee && !!form.errors.employee}
            error={form.errors.employee}
            value={form.values.employee}
            setValue={form.setFieldValue}
            id={form.values.employee?.id}
          />
          <View style={styles.inputView}>
            <TextInput
              style={{ width: "100%" }}
              mode="outlined"
              multiline={true}
              numberOfLines={3}
              label={t("description")}
              value={form.values.description}
              onChangeText={form.handleChange("description")}
              error={form.touched.description && !!form.errors.description}
            />
            {form.touched.description && form.errors.description && (
              <Text>{form.errors.description}</Text>
            )}
          </View>
          <View style={styles.inputView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
                width: "100%",
                gap: 15,
              }}
            >
              <TextInput
                style={{ flexGrow: 1 }}
                mode="outlined"
                label={t("barcode")}
                value={form.values.barcode}
                onChangeText={form.handleChange("barcode")}
                error={form.touched.barcode && !!form.errors.barcode}
              />
              <BarcodeScanner
                setIsScanning={setIsScanning}
                isScanning={isScanning}
              />
            </View>
            {form.touched.barcode && form.errors.barcode && (
              <Text>{form.errors.barcode}</Text>
            )}
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={{ width: "100%" }}
              mode="outlined"
              label={t("price")}
              value={
                form.values.price === -1 ? "" : form.values.price.toString()
              }
              onChangeText={form.handleChange("price")}
              error={form.touched.price && !!form.errors.price}
            />
            {form.touched.price && form.errors.price && (
              <Text>{form.errors.price}</Text>
            )}
          </View>
          <View style={styles.imageUpload}>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={[styles.inputView, { gap: 20, width: "100%" }]}>
                <Button
                  icon="upload-outline"
                  mode="outlined"
                  onPress={uploadPhoto}
                  style={[
                    { width: "100%" },
                    form.touched.image && form.errors.image
                      ? { borderColor: theme.colors.error, borderWidth: 2 }
                      : null,
                  ]}
                >
                  <Text>{t("uploadPhoto")}</Text>
                </Button>
                <Button
                  icon="camera-outline"
                  mode="outlined"
                  onPress={takePhoto}
                  style={[
                    { width: "100%" },
                    form.touched.image && form.errors.image
                      ? { borderColor: theme.colors.error, borderWidth: 2 }
                      : null,
                  ]}
                >
                  <Text>{t("takePhoto")}</Text>
                </Button>
              </View>
              {form.touched.image && form.errors.image && (
                <Text style={{ textAlign: "center" }}>{form.errors.image}</Text>
              )}
            </View>
            {form.values.image?.length > 0 && (
              <Avatar.Image
                size={110}
                source={{
                  uri: `data:image/jpeg;base64,${form.values.image}`,
                }}
              />
            )}
          </View>
          <Button
            mode="contained"
            onPress={() => form.handleSubmit()}
            loading={loading}
          >
            {editing ? t("edit") : t("create")}
          </Button>
        </View>
      ) : (
        <View style={cameraStyles.container}>
          <CameraView
            style={cameraStyles.camera}
            facing={"back"}
            barcodeScannerSettings={{
              barcodeTypes: ["upc_a", "ean13"],
            }}
            onBarcodeScanned={onBarcodeScanned}
          />
        </View>
      )}
    </View>
  );
}
