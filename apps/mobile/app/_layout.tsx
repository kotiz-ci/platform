import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { getAppVariant } from "../lib/variant";
import "../global.css";

// Depuis expo-router 58, Link est livré précompilé : le JSX de NativeWind ne
// le transforme plus, donc son className doit être déclaré explicitement.
cssInterop(Link, { className: "style" });

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Cf. ADR-010 — gating variant au boot. Chaque binaire (client/agent) ne rend QUE
  // ses routes pertinentes. Le code de l'autre variant n'est pas atteignable au runtime.
  const variant = getAppVariant();
  const isAgent = variant === "agent";
  const backgroundColor = isAgent ? "#0A2540" : "#FAF7F2";
  const statusBarStyle = isAgent ? "light" : "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={statusBarStyle} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor },
          }}
        >
          <Stack.Screen name="index" />
          {isAgent ? <Stack.Screen name="(agent)" /> : <Stack.Screen name="(client)" />}
          <Stack.Screen name="health/index" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
