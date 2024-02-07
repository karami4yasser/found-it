import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";
import { factor } from "../../utils/stylesUtils";

const styles = StyleSheet.create({
    addToFavContainer: {
        backgroundColor: COLORS.grayLight,
        borderRadius: 50,
        height: 20 * factor,
        width: 20 * factor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10 * factor
    }
});

export default styles;
