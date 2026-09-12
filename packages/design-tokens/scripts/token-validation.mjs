const isHexColor = (value) => typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value);
const isFontFamily = (value) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => typeof item === "string" && item.length > 0);
const isPixelDimension = (value) =>
  typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?px$/.test(value);

const groupDefinitions = [
  { source: "color", generated: "colors", validate: isHexColor },
  { source: "font-family", generated: "fontFamily", validate: isFontFamily },
  { source: "radius", generated: "radius", validate: isPixelDimension },
  { source: "spacing", generated: "spacing", validate: isPixelDimension },
];

function assertGroup(group, groupName) {
  if (!group || typeof group !== "object" || Array.isArray(group)) {
    throw new Error(`Groupe requis manquant ou invalide : ${groupName}`);
  }
}

function sourceEntries(group) {
  return Object.entries(group).filter(([name]) => !name.startsWith("$"));
}

export function assertSourceTokens(tokens) {
  for (const definition of groupDefinitions) {
    const group = tokens[definition.source];
    assertGroup(group, definition.source);

    for (const [tokenName, token] of sourceEntries(group)) {
      if (!token || typeof token !== "object" || Array.isArray(token) || !("$value" in token)) {
        throw new Error(`Valeur requise manquante : ${definition.source}.${tokenName}.$value`);
      }
      if (!definition.validate(token.$value)) {
        throw new Error(
          `Valeur invalide pour ${definition.source}.${tokenName} : ${JSON.stringify(token.$value)}`
        );
      }
    }
  }
}

export function assertGeneratedTokens(generatedTokens, sourceTokens) {
  assertSourceTokens(sourceTokens);

  for (const definition of groupDefinitions) {
    const generatedGroup = generatedTokens[definition.generated];
    assertGroup(generatedGroup, definition.generated);

    const expectedNames = sourceEntries(sourceTokens[definition.source]).map(([name]) => name);
    const actualNames = Object.keys(generatedGroup);
    const missing = expectedNames.filter((name) => !(name in generatedGroup));
    const unexpected = actualNames.filter((name) => !expectedNames.includes(name));
    if (missing.length > 0 || unexpected.length > 0) {
      throw new Error(
        `Clés incohérentes dans ${definition.generated}` +
          ` (manquantes : ${missing.join(", ") || "aucune"}` +
          ` ; inattendues : ${unexpected.join(", ") || "aucune"})`
      );
    }

    const invalid = Object.entries(generatedGroup)
      .filter(([, value]) => !definition.validate(value))
      .map(([name]) => name);
    if (invalid.length > 0) {
      throw new Error(`Valeurs invalides dans ${definition.generated} : ${invalid.join(", ")}`);
    }
  }
}
