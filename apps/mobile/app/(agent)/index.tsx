import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function AgentHome() {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-ink-900 mb-2">
          Espace Agent
        </Text>
        <Text className="text-base text-ink-700 text-center mb-6">
          (Placeholder Sprint 1 — les écrans Moussa seront livrés en Sprint 3-4 — Epic 6)
        </Text>
        <Link href="/" className="text-navy font-medium">
          ← Retour
        </Link>
      </View>
    </SafeAreaView>
  );
}
