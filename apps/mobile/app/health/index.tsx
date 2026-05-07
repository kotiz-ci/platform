import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import type { ApiHealthResponse } from "@kotiz/api-types";
import { formatFcfa } from "@kotiz/shared-utils";

export default function HealthScreen() {
  const [status, setStatus] = useState<ApiHealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO Sprint 1 Story 1.3a : remplacer par EXPO_PUBLIC_API_BASE_URL
    const apiBase = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

    fetch(`${apiBase}/actuator/health`)
      .then((r) => r.json() as Promise<ApiHealthResponse>)
      .then((json) => setStatus(json))
      .catch((err) => setError(String(err)));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-ink-900 mb-4">
          Connexion API
        </Text>

        {status && (
          <Text className="text-base text-success mb-2">
            Backend : {status.status}
          </Text>
        )}
        {error && (
          <Text className="text-base text-danger text-center mb-2">
            Erreur : {error}
          </Text>
        )}
        {!status && !error && (
          <Text className="text-base text-ink-500 mb-2">Chargement…</Text>
        )}

        <Text className="text-xs text-ink-500 mt-6 text-center">
          (Smoke check mobile ↔ backend ↔ packages partagés. Exemple format :{" "}
          {formatFcfa(125000)})
        </Text>

        <Link href="/" className="text-teal-deep font-medium mt-6">
          ← Retour
        </Link>
      </View>
    </SafeAreaView>
  );
}
