import { StyleSheet } from "react-native";

import { COLORS, FONT_WEIGHT, SIZES, FONT_WEIGHT_VALUES} from "../../styles/theme";

const RoundedButtonStyle = StyleSheet.create({
    RoundedButton: {
        flex: 0.60,
        color: COLORS.white,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 30,
    },
    textButton: {
        color: COLORS.white, 
        fontSize: SIZES.medium, 
        fontWeight: FONT_WEIGHT.Semibold,
    }

});

export default RoundedButtonStyle;