import { Divider, useTheme } from "react-native-paper";

export function CustomDivider() {
  const theme = useTheme();

  return (
    <Divider
      style={{
        width: "100%",
        backgroundColor: theme.colors.outline,
      }}
    />
  );
}
