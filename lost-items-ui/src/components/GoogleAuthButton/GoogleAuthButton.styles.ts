import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";

const GoogleAuthButtonStyles = StyleSheet.create({
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        borderBottomWidth: 3,
        borderColor: COLORS.tertiary,
        width: 120,
    },
    orText: {
        paddingHorizontal: 10,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        paddingVertical: 10,
        marginTop: '2%',
    },
    socialButton: {
        borderColor: '#7AD9F5',
        borderRadius: 50,
        borderWidth: 3,
        padding: '2%',
    },

});

export default GoogleAuthButtonStyles;