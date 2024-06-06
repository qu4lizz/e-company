import { View } from "react-native";
import { selectStyles } from "../styles/styles";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { useState } from "react";

interface Props {
  value: any;
  setValue: any;
  id: any;
  text: string;
  showError?: boolean;
  error: any;
  data: any;
  fieldValueName: string;
}

export function Select({
  value,
  setValue,
  id,
  text,
  showError,
  error,
  data,
  fieldValueName,
}: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const renderEmployeeLabel = () => {
    if (value || isFocused) {
      return renderText(text, isFocused);
    }
    return null;
  };
  const renderText = (text: string, focused: boolean) => {
    return (
      <Text
        style={[
          selectStyles.label,
          focused && {
            color: theme.colors.primary,
          },
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {text}
      </Text>
    );
  };

  return (
    <View style={selectStyles.container}>
      {renderEmployeeLabel()}
      <Dropdown
        style={[
          selectStyles.dropdown,
          { backgroundColor: theme.colors.background },
          isFocused
            ? { borderColor: theme.colors.primary, borderWidth: 2 }
            : { borderColor: theme.colors.outline },
          showError
            ? { borderColor: theme.colors.error, borderWidth: 2 }
            : null,
        ]}
        placeholderStyle={[
          selectStyles.placeholderStyle,
          { color: theme.colors.onSurfaceVariant },
        ]}
        selectedTextStyle={[
          selectStyles.selectedTextStyle,
          { color: theme.colors.onSurface },
        ]}
        itemTextStyle={{
          color: theme.colors.onSurfaceVariant,
          backgroundColor: theme.colors.background,
        }}
        itemContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
        inputSearchStyle={[
          selectStyles.inputSearchStyle,
          {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface,
          },
        ]}
        search
        maxHeight={300}
        data={data}
        placeholder={isFocused ? "" : text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        labelField="name"
        valueField="id"
        value={id}
        onChange={(item) => {
          setValue(fieldValueName, item);
          setIsFocused(false);
        }}
      />
      {showError && <Text>{error}</Text>}
    </View>
  );
}
