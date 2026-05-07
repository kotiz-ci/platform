import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function ClientHome() {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-ink-900 mb-2">
          Espace Cliente
        </Text>
        <Text className="text-base text-ink-700 text-center mb-6">
          (Placeholder Sprint 1 — les écrans Fatou seront livrés en Sprint 2-3)
        </Text>
        <Link href="/" className="text-teal-deep font-medium">
          ← Retour
        </Link>
      </View>
    </SafeAreaView>
  );
}
