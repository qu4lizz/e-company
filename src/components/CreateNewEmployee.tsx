import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as yup from "yup";
import { DatePickerInput } from "react-native-paper-dates";
import { createEmployee } from "../db/employee";
import { useAppDispatch } from "../reducers/store";
import { setHeader } from "../reducers/headerSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  inputView: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props {
  reload: () => void;
}

export function CreateNewEmployee({ reload }: Props) {
  const { t } = useTranslation("home");
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("nameAndSurnameRequired")),
    role: yup.string().required(t("roleRequired")),
    start_date: yup.date().required(t("startDateRequired")),
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);

    const date = new Date(form.values.start_date!).toISOString();

    createEmployee({
      name: form.values.name,
      role: form.values.role,
      start_date: date,
    })
      .then(async () => {
        dispatch(await setHeader("falsifyAll"));
        reload();
      })
      .finally(() => setLoading(false));
  };

  const form = useFormik({
    initialValues: {
      name: "",
      role: "",
      start_date: undefined,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{t("createNewEmployee")}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={{ width: "100%" }}
          mode="outlined"
          label={t("nameAndSurname")}
          value={form.values.name}
          onChangeText={form.handleChange("name")}
          error={form.touched.name && !!form.errors.name}
        />
        {form.touched.name && form.errors.name && (
          <Text>{form.errors.name}</Text>
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={{ width: "100%" }}
          mode="outlined"
          label={t("role")}
          value={form.values.role}
          onChangeText={form.handleChange("role")}
          error={form.touched.role && !!form.errors.role}
        />
        {form.touched.role && form.errors.role && (
          <Text>{form.errors.role}</Text>
        )}
      </View>
      <View style={styles.inputView}>
        <DatePickerInput
          mode="outlined"
          locale="en-GB"
          label={t("startDate")}
          value={form.values.start_date}
          onChange={(date: Date | undefined) => {
            form.setFieldValue("start_date", date);
          }}
          inputMode="start"
          validRange={{ endDate: new Date() }}
        />
        {form.touched.start_date && form.errors.start_date && (
          <Text>{form.errors.start_date}</Text>
        )}
      </View>
      <Button
        mode="contained"
        onPress={() => form.handleSubmit()}
        loading={loading}
      >
        {t("create")}
      </Button>
    </View>
  );
}
