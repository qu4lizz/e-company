import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../components/Main";
import { useTranslation } from "react-i18next";
import { TextInput, useTheme, Text, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createInventoryList,
  getInventoryListById,
  updateInventoryList,
} from "../db/inventoryLists";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { buttonStyles, cameraStyles, createNewStyles } from "../styles/styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Select } from "../components/Select";
import { AssetWithLocationAndEmployee } from "../types/Asset";
import { Location } from "../types/Location";
import {
  getAssetByBarcode,
  getAssetsWithLocationAndEmployee,
  updateAssetEmployee,
  updateAssetLocation,
} from "../db/assets";
import { Employee } from "../types/Employee";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { InventoryListItem } from "../components/InventoryListItem";
import { ItemSeparator } from "../components/ItemSeparator";
import { createInventoryListItem } from "../db/inventoryListItems";
import { getLocations } from "../db/locations";
import { getEmployees } from "../db/employee";

type CreateNewInventoryList = RouteProp<
  RootStackParamList,
  "CreateNewInventoryList"
>;

export function CreateNewInventoryList() {
  const route = useRoute<CreateNewInventoryList>();
  const { reload, inventoryList } = route.params;
  const navigation = useNavigation();

  const { t } = useTranslation(["home"]);
  const theme = useTheme();

  const [adding, setAdding] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const [assets, setAssets] = useState<AssetWithLocationAndEmployee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // edit
  const editing = inventoryList ? true : false;
  const [inventoryListFetched, setInventoryListFetched] = useState<any>();
  const [inventoryListPassed, setInventoryListPassed] =
    useState<any>(inventoryList);

  useEffect(() => {
    navigation.setOptions({
      title: editing ? t("editInventoryList") : t("createNewInventoryList"),
    });

    getAssetsWithLocationAndEmployee().then((res) => {
      setAssets(res);
    });
    getLocations().then((res) => {
      setLocations(res);
    });
    getEmployees().then((res) => {
      setEmployees(res);
    });

    if (editing) {
      getInventoryListById(inventoryList.id).then((res) => {
        setInventoryListFetched(res);
      });
    }
  }, []);

  const onSubmit = () => {
    setLoading(true);

    if (editing) {
      updateInventoryList({
        id: inventoryListFetched!.id,
        name: form.values.name,
        created_at: inventoryListFetched!.created_at,
      })
        .then(async () => {
          onSubmitDone(inventoryListFetched!.id);
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        });
    } else {
      createInventoryList({
        name: form.values.name,
        created_at: new Date().toISOString(),
      })
        .then(async (res) => {
          onSubmitDone(res);
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        });
    }
  };

  const onSubmitDone = (id: any) => {
    reload();
    form.values.assets.forEach((a: any) => {
      const obj = {
        inventory_list_id: id,
        asset_id: a.asset.id,
        current_employee_id: a.asset.employee.id,
        new_employee_id: a.newEmployee?.id,
        current_location_id: a.asset.location.id,
        new_location_id: a.newLocation?.id,
      };
      createInventoryListItem(obj);
      if (obj.current_employee_id !== obj.new_employee_id) {
        updateAssetEmployee(a.asset.id, obj.new_employee_id);
      }
      if (obj.current_location_id !== obj.new_location_id) {
        updateAssetLocation(a.asset.id, obj.new_location_id);
      }
    });
  };

  const form = useFormik({
    initialValues: {
      name: inventoryList ? inventoryList.name : "",
      assets: [],
    },
    onSubmit,
    validationSchema: yup.object().shape({
      name: yup.string().required(t("nameRequired")),
    }),
  });

  const itemForm = useFormik<any>({
    initialValues: {
      asset: null,
      newEmployee: null,
      newLocation: null,
    },
    onSubmit: (values) => {
      form.setFieldValue("assets", [...form.values.assets, values]);
      itemForm.resetForm();
      setAdding(false);
    },
    validationSchema: yup.object().shape({
      asset: yup.object().required(t("assetRequired")),
      newLocation: yup.object().required(t("locationRequired")),
      newEmployee: yup.object().required(t("employeeRequired")),
    }),
  });

  const onBarcodeScanned = async (data: BarcodeScanningResult) => {
    const asset = await getAssetByBarcode(data.data);
    const completeAsset = assets.find((a: any) => a.id === asset.id);
    itemForm.setFieldValue("asset", completeAsset);
    setIsScanning(false);
  };

  const onDelete = (assetName: string, existing: boolean = false) => {
    form.setFieldValue(
      "assets",
      form.values.assets.filter((a: any) => a.asset.name !== assetName)
    );
    if (existing) {
      setInventoryListPassed({
        ...inventoryListPassed,
        assets: inventoryListPassed.assets.filter(
          (a: any) => a.asset.name !== assetName
        ),
      });
    }

    reload();
  };

  return (
    <View style={createNewStyles.container}>
      {isScanning ? (
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
      ) : (
        <FlatList
          style={{ width: "100%", flex: 1 }}
          data={form.values.assets}
          renderItem={({ item }: any) => (
            <InventoryListItem
              inventoryListItem={item}
              onDelete={() => onDelete(item.asset.name)}
              isEditing={true}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={
            <View style={createNewStyles.container}>
              <View style={createNewStyles.inputView}>
                <TextInput
                  style={{ width: "100%" }}
                  mode="outlined"
                  label={t("name")}
                  value={form.values.name}
                  onChangeText={form.handleChange("name")}
                  error={form.touched.name && Boolean(form.errors.name)}
                />
                {form.touched.name && form.errors.name && (
                  <Text>{form.errors.name as string}</Text>
                )}
              </View>
              <View style={createNewStyles.container2}>
                {adding ? (
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 20,
                      width: "90%",
                      paddingVertical: 20,
                      borderColor: theme.colors.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ width: "90%" }}>
                      <View
                        style={{ gap: 10, flexDirection: "row", width: "90%" }}
                      >
                        <Select
                          text={t("asset")}
                          data={assets}
                          fieldValueName="asset"
                          value={itemForm.values.asset}
                          setValue={itemForm.setFieldValue}
                          showError={
                            itemForm.touched.asset &&
                            Boolean(itemForm.errors.asset)
                          }
                          error={itemForm.errors.asset}
                          id={itemForm.values.asset?.id}
                        />
                        <BarcodeScanner
                          isScanning={isScanning}
                          setIsScanning={setIsScanning}
                        />
                      </View>
                    </View>
                    <Text variant="bodyLarge">
                      {t("currentLocation")}:{" "}
                      {itemForm.values.asset?.location?.name}
                    </Text>
                    <Text variant="bodyLarge">
                      {t("currentEmployee")}:{" "}
                      {itemForm.values.asset?.employee?.name}
                    </Text>
                    <Select
                      text={t("newLocation")}
                      data={locations}
                      fieldValueName="newLocation"
                      value={itemForm.values.newLocation}
                      setValue={itemForm.setFieldValue}
                      showError={
                        itemForm.touched.newLocation &&
                        Boolean(itemForm.errors.newLocation)
                      }
                      error={itemForm.errors.newLocation}
                      id={itemForm.values.newLocation?.id}
                    />
                    <Select
                      text={t("newEmployee")}
                      data={employees}
                      fieldValueName="newEmployee"
                      value={itemForm.values.newEmployee}
                      setValue={itemForm.setFieldValue}
                      showError={
                        itemForm.touched.newEmployee &&
                        Boolean(itemForm.errors.newEmployee)
                      }
                      error={itemForm.errors.newEmployee}
                      id={itemForm.values.newEmployee?.id}
                    />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Button
                        mode="outlined"
                        onPress={() => {
                          setAdding(false);
                          itemForm.resetForm();
                        }}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => itemForm.handleSubmit()}
                      >
                        {t("addAsset")}
                      </Button>
                    </View>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      setAdding(true);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: 10,
                    }}
                  >
                    <Text variant="bodyLarge">{t("addAsset")}</Text>
                    <View style={buttonStyles.container}>
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={36}
                        color={theme.colors.primary}
                      />
                    </View>
                  </Pressable>
                )}
              </View>
              {inventoryListPassed && (
                <FlatList
                  style={{ width: "100%", flex: 1 }}
                  data={inventoryListPassed.assets}
                  renderItem={({ item }: any) => (
                    <InventoryListItem
                      inventoryListItemFormatted={item}
                      onDelete={() => onDelete(item.asset.name, true)}
                      isEditing={true}
                    />
                  )}
                  ItemSeparatorComponent={ItemSeparator}
                />
              )}
            </View>
          }
          ListFooterComponent={
            <View style={[createNewStyles.container, { marginBottom: 20 }]}>
              <Button
                mode="contained"
                onPress={() => form.handleSubmit()}
                loading={loading}
              >
                {editing ? t("edit") : t("create")}
              </Button>
            </View>
          }
        />
      )}
    </View>
  );
}
