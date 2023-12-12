import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLORS } from "../../styles/theme";
const { width, height } = Dimensions.get("window");
export const factor = width * height > 600000 ? 2 : 1;
export const bigFactor = width * height > 600000 ? 2.5 : 1;

const styles = StyleSheet.create({
    postItemContainer: {
        flex: 1,
        flexDirection: "column",
    },
    scrollingContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    scrollingContentContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: height * 0.7,
    },
    postItemHeadingTitleContainer: {
        flex: 2,
        minHeight: 100 * factor,
        justifyContent: "center",
        marginTop: 20 * factor,
    },
    postItemHeadingTitle: {
        fontSize: 16 * factor,
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 10 * factor,
    },
    postItemSwitchSelector: {
        flex: 2,
        margin: 20 * factor,
        marginBottom: 5 * factor,
        marginTop: 0
    },
    postItemPositionInfoContainer: {
        flex: 6,
        paddingHorizontal: 6 * bigFactor,
        width: "90%",
        margin: 20 * factor,
        height: 80 * factor,
    },
    postItemCoordinates: {
        flex: 2,
        flexDirection: "row",
        paddingHorizontal: 20 * factor,
        alignContent: "space-between",
        paddingVertical: 5 * factor,
    },
    postItemTAR: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20 * factor,
        alignContent: "space-between",
        paddingVertical: 5 * factor,
    },
    postItemKVKey: {
        flex: 1,
        fontSize: 12 * bigFactor,
        fontWeight: "700",
    },
    postItemKVValue: {
        flex: 1,
        fontSize: 12 * bigFactor,
        color: COLORS.tertiary,
        fontWeight: "500",
    },
    postItemKVValue2: {
        flex: 1,
        fontSize: 12 * bigFactor,
        color: COLORS.tertiary,
        fontWeight: "500",
        marginLeft: 40 * factor,
    },
    postItemImagePickingContainer: {
        flex: 3,
        flexDirection: "row",
        paddingHorizontal: 30 * factor,
        paddingVertical: 10 * factor,
        height: 80 * factor,
        marginBottom: 5 * factor,   
    },
    postItemImageContainer: {
        flex: 1,
        flexDirection: "row",
        height: 70 * factor,
        justifyContent: "center",
    },
    postItemImageEditContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: 70 * factor,
    },
    postItemImage: {
        flex: .5,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 10 * factor,
    },
    postItemPrincipalInfoContainer: {
        flex: 10,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
    postItemDescriptionContainer: {
        flex: 1,
        width: "80%",
        height: 130 * factor,
    },
    postItemTitleContainer: {
        flex: 1,
        margin: 10 * factor,
        width: "80%",
    },
    postItemCategoryContainer: {
        flex: 3,
        width: "80%",
        margin: 10 * factor,
    },
    postItemDateContainer: {
        flex: 1,
        width: "80%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",   
        textAlignVertical: "center",
        marginVertical: 10 * factor,
        margin: 10 * factor,
    },
    postItemDateTextContainer: {
        flex: 1,
        width: "100%",
        textAlignVertical: "center",
        marginVertical: 10 * factor,
        flexDirection: "row",
    },
});

export default styles;