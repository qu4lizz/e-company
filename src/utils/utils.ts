import { useTranslation } from "react-i18next";

type FormatType = "date" | "datetime";
export function formatDate(
  date: string | Date,
  formatType: FormatType = "date"
): string {
  const { t } = useTranslation("home");
  const options = {
    dateStyle: "medium",
    timeStyle: formatType === "datetime" ? "short" : undefined,
  } as const;

  return new Date(date).toLocaleString(t("dateFormat"), options);
}

export function getAddressFromCoordinates(
  latitude: any,
  longitude: any
): Promise<string> {
  const myApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return new Promise((resolve, reject) => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        latitude +
        "," +
        longitude +
        "&key=" +
        myApiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "OK") {
          resolve(responseJson?.results?.[0]?.formatted_address);
        } else {
          reject("not found");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
