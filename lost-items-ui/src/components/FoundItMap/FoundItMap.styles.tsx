import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";
import { bigFactor, factor } from "../../utils/stylesUtils";

const styles = StyleSheet.create({
  mapPageContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  mapView: {
    minHeight: "100%",
    minWidth: "100%",
  },
  mapSettingsContainer: {
    position: "absolute",
    flex: 1,
    bottom: "1%",
    height: "35%",
    width: "97%",
    borderRadius: 20 * factor,
    backgroundColor: COLORS.white,
  },
  mapSettingsTitleContainer: {
    flex: 1,
    padding: 20 * factor,
    paddingBottom: 10 * factor,
  },
  mapSettingsTitleText: {
    fontSize: 20 * factor,
    fontWeight: "700",
  },
  mapSettingsPositionContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20 * factor,
    alignContent: "space-between",
    paddingVertical: 5 * factor,
  },
  mapSettingsKVKey: {
    flex: 1,
    fontSize: 12 * bigFactor,
    fontWeight: "700",
  },
  mapSettingsKVValue: {
    flex: 1,
    fontSize: 12 * bigFactor,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  mapSettingsTARContainer: {
    flex: 2,
    paddingHorizontal: 30 * factor,
  },
  mapSettingsTARSlider: {
    flex: 1,
  },
  mapSettingsTarBoundries: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapSettingsTarBoundryValue: {
    fontSize: 15 * factor,
    fontWeight: "700",
  },
});

export default styles;
