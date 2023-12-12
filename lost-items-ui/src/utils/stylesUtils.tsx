import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const factor = width * height > 600000 ? 1.3 : 1;
const bigFactor = width * height > 600000 ? 2.5 : 1;
export { width, height, factor, bigFactor };
