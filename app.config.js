export default {
  expo: {
    name: "e-company",
    slug: "e-company",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera"
        }
      ]
    ],
    android: {
      config: {
        googleMaps: {
          apiKey: ""
        },
        permissions: [
          "ACCESS_COARSE_LOCATION",
          "ACCESS_FINE_LOCATION",
          "INTERNET"
        ]
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ],
      package: "com.miroslav.ecompany.app",
      versionCode: 27,
      gradleCommand: ":app:assembleRelease",
      gradle: {
        file: "./custom-build.gradle"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "b6002fcb-cf15-4ce1-a4b3-e43ece6e7a92"
      }
    }
  }
};
