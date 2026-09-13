import type { ExpoConfig } from "expo/config";

// Variant Expo (cf. ADR-010). Défaut "client" en dev local.
type AppVariant = "client" | "agent";

const rawVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
const variant: AppVariant = rawVariant === "agent" ? "agent" : "client";

const VERSION = "0.1.0";
const BUILD_NUMBER = 1;

const variantConfig = {
  client: {
    name: "KOTIZ",
    slug: "kotiz-mobile",
    scheme: "kotiz",
    backgroundColor: "#FAF7F2",
    bundleIdentifier: "ci.kotiz.client",
    cameraDescription: [
      "KOTIZ utilise la caméra pour scanner ta CNI",
      "lors de la vérification d'identité (KYC).",
    ].join(" "),
    locationDescription: undefined,
    permissions: ["android.permission.CAMERA", "android.permission.READ_EXTERNAL_STORAGE"],
  },
  agent: {
    name: "KOTIZ Agent",
    slug: "kotiz-mobile-agent",
    scheme: "kotiz-agent",
    backgroundColor: "#0A2540",
    bundleIdentifier: "ci.kotiz.agent",
    cameraDescription:
      "KOTIZ Agent utilise la caméra pour scanner la CNI des clientes " +
      "lors de l'enrôlement KYC Tier 1.",
    locationDescription:
      "KOTIZ Agent enregistre la zone d'intervention pour la conformité " +
      "et la détection de fraude.",
    permissions: [
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
  },
} as const;

const selectedVariant = variantConfig[variant];

const config: ExpoConfig = {
  name: selectedVariant.name,
  slug: selectedVariant.slug,
  scheme: selectedVariant.scheme,
  version: VERSION,
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    resizeMode: "contain",
    backgroundColor: selectedVariant.backgroundColor,
  },

  assetBundlePatterns: ["**/*"],

  ios: {
    supportsTablet: false,
    bundleIdentifier: selectedVariant.bundleIdentifier,
    buildNumber: String(BUILD_NUMBER),
    infoPlist: {
      NSCameraUsageDescription: selectedVariant.cameraDescription,
      NSPhotoLibraryUsageDescription:
        "KOTIZ peut accéder aux photos pour téléverser des justificatifs.",
      ...(selectedVariant.locationDescription && {
        NSLocationWhenInUseUsageDescription: selectedVariant.locationDescription,
      }),
    },
  },

  android: {
    package: selectedVariant.bundleIdentifier,
    versionCode: BUILD_NUMBER,
    edgeToEdgeEnabled: true,
    permissions: [...selectedVariant.permissions],
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
        backgroundColor: selectedVariant.backgroundColor,
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
