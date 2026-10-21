import Constants from "expo-constants";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("expo-constants", () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} as { variant?: string } } },
}));

// Les polices ne se chargent pas dans Jest : le layout racine attend leur chargement.
jest.mock("@expo-google-fonts/inter", () => ({
  ...jest.requireActual("@expo-google-fonts/inter"),
  useFonts: () => [true, null],
}));

const extra = Constants.expoConfig!.extra as { variant?: string };

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ status: "UP" }) });
});

describe.each([
  ["client", "KOTIZ", "/(client)", "Espace Cliente"],
  ["agent", "KOTIZ Agent", "/(agent)", "Espace Agent"],
])("Expo routes of the %s variant", (variant, homeTitle, spaceRoute, spaceTitle) => {
  beforeEach(() => {
    extra.variant = variant;
  });

  it("renders the home page", async () => {
    await renderRouter("./app", { initialUrl: "/" });

    expect(await screen.findByText(homeTitle)).toBeOnTheScreen();
  });

  it("renders the variant space", async () => {
    await renderRouter("./app", { initialUrl: spaceRoute });

    expect(await screen.findByText(spaceTitle)).toBeOnTheScreen();
  });

  it("renders the API health page", async () => {
    await renderRouter("./app", { initialUrl: "/health" });

    expect(await screen.findByText("Backend : UP")).toBeOnTheScreen();
    expect(screen.getByText(new RegExp(`Variant : ${variant}`))).toBeOnTheScreen();
  });
});

it("reports an unreachable backend on the health page", async () => {
  extra.variant = "client";
  global.fetch = jest.fn().mockRejectedValue(new Error("offline"));

  await renderRouter("./app", { initialUrl: "/health" });

  expect(await screen.findByText("Erreur : Error: offline")).toBeOnTheScreen();
});
