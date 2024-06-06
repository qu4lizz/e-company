import { Pressable } from "react-native";
import { singleItemStyles } from "../styles/styles";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";

interface Props {
  setIsScanning: any;
  isScanning: boolean;
}

export function BarcodeScanner({ isScanning, setIsScanning }: Props) {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (isScanning) {
      const requestCameraPermission = async () => {
        const { granted } = await requestPermission();
      };

      requestCameraPermission();
    }
  }, [isScanning]);

  return (
    <Pressable
      onPress={() => setIsScanning(true)}
      style={[singleItemStyles.icons, { borderColor: theme.colors.outline }]}
    >
      <MaterialCommunityIcons
        name="barcode-scan"
        size={36}
        color={theme.colors.primary}
      />
    </Pressable>
  );
}
