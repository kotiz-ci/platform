import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import type { ApiHealthResponse } from "@kotiz/api-types";
import { formatFcfa } from "@kotiz/shared-utils";
import { getAppVariant } from "../../lib/variant";

export default function HealthScreen() {
  const [status, setStatus] = useState<ApiHealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const variant = getAppVariant();
  const isAgent = variant === "agent";

  useEffect(() => {
    // TODO Sprint 1 Story 1.3a : remplacer par EXPO_PUBLIC_API_BASE_URL
    const apiBase = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

    fetch(`${apiBase}/actuator/health`)
      .then((r) => r.json() as Promise<ApiHealthResponse>)
      .then((json) => setStatus(json))
      .catch((err) => setError(String(err)));
  }, []);

  const bgClass = isAgent ? "bg-navy" : "bg-cream";
  const titleClass = isAgent ? "text-surface" : "text-ink-900";
  const helperClass = isAgent ? "text-cream/60" : "text-ink-500";
  const accentClass = isAgent ? "text-gold" : "text-teal-deep";
  const isLoading = !status && !error;

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className={`text-2xl font-bold ${titleClass} mb-4`}>Connexion API</Text>

        {status && <Text className="text-base text-success mb-2">Backend : {status.status}</Text>}
        {error && <Text className="text-base text-danger text-center mb-2">Erreur : {error}</Text>}
        {isLoading && <Text className={`text-base ${helperClass} mb-2`}>Chargement…</Text>}

        <Text className={`text-xs ${helperClass} mt-6 text-center`}>
          Variant : {variant} · format : {formatFcfa(125000)}
        </Text>

        <Link href="/" className={`${accentClass} font-medium mt-6`}>
          ← Retour
        </Link>
      </View>
    </SafeAreaView>
  );
}
