import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { createNewStyles, radioStyles } from "../styles/styles";
import { Button, RadioButton, Text } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { getEmployeesByStartedDate } from "../db/employee";

interface Props {
  setEmployees: any;
}

export function FilterEmployees({ setEmployees }: Props) {
  const { t } = useTranslation("home");

  const [date, setDate] = useState<Date>();
  const [isBefore, setIsBefore] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const filterEmployees = () => {
    if (date) {
      setLoading(true);
      getEmployeesByStartedDate(isBefore, date)
        .then((res) => {
          setEmployees(res);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={createNewStyles.container}>
      <Text variant="titleLarge">{t("filterEmployees")}</Text>
      <View style={radioStyles.container}>
        <View>
          <Text variant="labelLarge">{t("before")}</Text>
          <RadioButton
            value={t("before")}
            status={isBefore ? "checked" : "unchecked"}
            onPress={() => setIsBefore(true)}
          />
        </View>
        <View>
          <Text variant="labelLarge">{t("after")}</Text>
          <RadioButton
            value={t("after")}
            status={!isBefore ? "checked" : "unchecked"}
            onPress={() => setIsBefore(false)}
          />
        </View>
      </View>
      <View style={createNewStyles.inputView}>
        <DatePickerInput
          mode="outlined"
          locale="en-GB"
          label={t("dateOfEmployment")}
          value={date}
          onChange={(date: Date | undefined) => {
            setDate(date!);
          }}
          inputMode="start"
          validRange={{ endDate: new Date() }}
        />
      </View>
      <Button mode="contained" onPress={filterEmployees} loading={loading}>
        {t("filter")}
      </Button>
    </View>
  );
}
