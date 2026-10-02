import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAppVariant } from "../lib/variant";

export default function HomeScreen() {
  const variant = getAppVariant();
  const isAgent = variant === "agent";

  if (isAgent) {
    return <AgentHome />;
  }
  return <ClientHome />;
}

function ClientHome() {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl font-extrabold text-ink-900 mb-2">KOTIZ</Text>
        <Text className="text-base text-ink-700 text-center mb-8">
          Akwaba Fatou. Épargne ton premier 100 FCFA aujourd’hui.
        </Text>

        <View className="w-full gap-3">
          <Link
            href="/(client)"
            className="bg-teal-deep text-surface text-center py-4 rounded-xl font-semibold"
          >
            Commencer
          </Link>
          <Link href="/health" className="text-ink-500 text-center py-3 text-sm">
            Vérifier la connexion API →
          </Link>
        </View>

        <Text className="text-xs text-ink-500 mt-12 text-center">
          MVP Sprint 1 · Story 1.1 · Variant client · v0.1.0
        </Text>
      </View>
    </SafeAreaView>
  );
}

function AgentHome() {
  return (
    <SafeAreaView className="flex-1 bg-navy">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl font-extrabold text-surface mb-2">KOTIZ Agent</Text>
        <Text className="text-base text-cream/80 text-center mb-8">
          Espace Moussa. Onboarde et accompagne tes clientes.
        </Text>

        <View className="w-full gap-3">
          <Link
            href="/(agent)"
            className="bg-gold text-navy text-center py-4 rounded-xl font-semibold"
          >
            Connexion agent
          </Link>
          <Link href="/health" className="text-cream/60 text-center py-3 text-sm">
            Vérifier la connexion API →
          </Link>
        </View>

        <Text className="text-xs text-cream/50 mt-12 text-center">
          MVP Sprint 1 · Story 1.1 · Variant agent · v0.1.0
        </Text>
      </View>
    </SafeAreaView>
  );
}
