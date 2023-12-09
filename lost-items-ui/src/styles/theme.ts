const COLORS = {
  primary: "#776B5D",
  secondary: "#B0A695",
  lightSecondary: "#EBE3D5",
  tertiary: "#6B240C",

  grayLight: "#E5E7EB",
  grayDark: "#99A0AC",

  black: "#090909",
  white: "#FFFFFF",
  lightWhite: "#F6F6F6",

  green: "#34A853",
  red: "#EB4335",
  golden: "#FFA800",
};
type FONT_WEIGHT_VALUES =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "normal"
  | "bold"
  | undefined;

const FONT_WEIGHT: { [key: string]: FONT_WEIGHT_VALUES } = {
  Thin: "100",
  Ultra_Light: "200",
  Light: "300",
  Regular: "400",
  Medium: "500",
  Semibold: "600",
  Bold: "700",
  Heavy: "800",
  Black: "900",
};
const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 40,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT_WEIGHT, SIZES, SHADOWS };
export type { FONT_WEIGHT_VALUES };
