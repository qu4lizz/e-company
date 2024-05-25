import { Pressable, StyleSheet, View } from "react-native";
import { Asset as AssetType } from "../types/Asset";
import { Avatar, Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 20,
    paddingRight: 90,
  },
});

interface AssetProps {
  asset: AssetType;
}

export function Asset({ asset }: AssetProps) {
  const theme = useTheme();

  return (
    <>
      {asset && (
        <Pressable
          style={[
            styles.container,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
          onPress={() => console.log("press")}
        >
          <View>
            {asset.image && (
              <Avatar.Image
                size={64}
                source={{
                  uri: URL.createObjectURL(
                    new Blob([asset.image], { type: "image/png" })
                  ),
                }}
              />
            )}
          </View>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>
              {asset?.name}
            </Text>
            <Text variant="bodyMedium">{asset?.description}</Text>
          </View>
        </Pressable>
      )}
    </>
  );
}
