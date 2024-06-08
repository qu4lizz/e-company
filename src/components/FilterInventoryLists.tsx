import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getInventoryListsByDate } from "../db/inventoryLists";
import { View } from "react-native";
import { createNewStyles, radioStyles } from "../styles/styles";
import { Button, RadioButton, Text } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

interface Props {
  setInventoryLists: any;
}

export default function FilterInventoryLists({ setInventoryLists }: Props) {
  const { t } = useTranslation(["home"]);

  const [date, setDate] = useState<Date>();
  const [isBefore, setIsBefore] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const filterAssets = () => {
    if (date) {
      setLoading(true);
      getInventoryListsByDate(isBefore, date)
        .then((res) => {
          setInventoryLists(res);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={createNewStyles.container}>
      <Text variant="titleLarge">{t("filterInventoryLists")}</Text>
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
            status={isBefore ? "unchecked" : "checked"}
            onPress={() => setIsBefore(false)}
          />
        </View>
      </View>
      <View style={createNewStyles.inputView}>
        <DatePickerInput
          mode="outlined"
          locale="en-GB"
          label={t("dateOfCreation")}
          value={date}
          onChange={(value) => setDate(value)}
          inputMode="start"
          validRange={{ endDate: new Date() }}
        />
      </View>
      <Button mode="contained" onPress={filterAssets} loading={loading}>
        {t("filter")}
      </Button>
    </View>
  );
}
