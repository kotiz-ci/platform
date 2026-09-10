import type { ExpoConfig } from "expo/config";

// Variant Expo (cf. ADR-010). Défaut "client" en dev local.
type AppVariant = "client" | "agent";

const rawVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
const variant: AppVariant = rawVariant === "agent" ? "agent" : "client";

const isAgent = variant === "agent";

const VERSION = "0.1.0";
const BUILD_NUMBER = 1;

const config: ExpoConfig = {
  name: isAgent ? "KOTIZ Agent" : "KOTIZ",
  slug: isAgent ? "kotiz-mobile-agent" : "kotiz-mobile",
  scheme: isAgent ? "kotiz-agent" : "kotiz",
  version: VERSION,
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    resizeMode: "contain",
    backgroundColor: isAgent ? "#0A2540" : "#FAF7F2",
  },

  assetBundlePatterns: ["**/*"],

  ios: {
    supportsTablet: false,
    bundleIdentifier: isAgent ? "ci.kotiz.agent" : "ci.kotiz.client",
    buildNumber: String(BUILD_NUMBER),
    infoPlist: {
      NSCameraUsageDescription: isAgent
        ? "KOTIZ Agent utilise la caméra pour scanner la CNI des clientes lors de l'enrôlement KYC Tier 1."
        : "KOTIZ utilise la caméra pour scanner ta CNI lors de la vérification d'identité (KYC).",
      NSPhotoLibraryUsageDescription:
        "KOTIZ peut accéder aux photos pour téléverser des justificatifs.",
      NSMicrophoneUsageDescription: isAgent
        ? "KOTIZ Agent peut enregistrer des messages vocaux pour communiquer avec les clientes peu lettrées."
        : "KOTIZ peut utiliser le micro pour les messages vocaux WhatsApp (optionnel).",
      ...(isAgent && {
        NSLocationWhenInUseUsageDescription:
          "KOTIZ Agent enregistre la zone d'intervention pour la conformité et la détection de fraude.",
      }),
    },
  },

  android: {
    package: isAgent ? "ci.kotiz.agent" : "ci.kotiz.client",
    versionCode: BUILD_NUMBER,
    edgeToEdgeEnabled: true,
    permissions: [
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.RECORD_AUDIO",
      ...(isAgent ? ["android.permission.ACCESS_FINE_LOCATION"] : []),
    ],
  },

  web: {
    bundler: "metro",
  },

  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-splash-screen",
      {
        backgroundColor: isAgent ? "#0A2540" : "#FAF7F2",
        resizeMode: "contain",
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },

  locales: {
    fr: "./assets/locales/fr.json",
  },

  extra: {
    // Exposé au runtime via Constants.expoConfig.extra.variant
    variant,
    eas: {
      // À compléter Sprint 2 quand projet Expo créé : projectId
    },
  },
};

export default config;
