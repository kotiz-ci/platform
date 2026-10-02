// Point d'entrée thème pour l'app mobile KOTIZ.
// Ré-exporte @kotiz/design-tokens/theme — valeurs unitless (number) pour RN StyleSheet,
// Reanimated withSpring/withTiming, et props numériques (@gorhom/bottom-sheet snapPoints…).
//
// Exemples :
//   import theme from "@/lib/theme";
//   StyleSheet.create({ card: { borderRadius: theme.radii.lg, padding: theme.space.md } })
//
//   import { palette, typography } from "@/lib/theme";
//   <Text style={{ color: palette.primary, ...typography.body }}>…</Text>
//
//   import { shadows } from "@/lib/theme";
//   <View style={shadows.md}>…</View>  // cross-platform (shadowColor iOS + elevation Android)

export {
  theme as default,
  palette,
  space,
  radii,
  typography,
  shadows,
} from "@kotiz/design-tokens/theme";

export type {
  Theme,
  PaletteKey,
  SpaceKey,
  RadiiKey,
  TypographyKey,
  ShadowKey,
} from "@kotiz/design-tokens/theme";
