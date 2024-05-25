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
