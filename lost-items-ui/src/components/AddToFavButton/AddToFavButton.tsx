import React from "react";
import { Button } from "react-native";
import { View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../styles/theme";
import styles from "./AddToFavButton.styles"



const AddToFavButton = ({ isFav, onClick }) => {
    return (
        <View style={styles.addToFavContainer}>
            {isFav ? <FontAwesome name="bookmark" size={15} color={COLORS.tertiary} /> : 
            <FontAwesome name="bookmark-o" size={15} color={COLORS.tertiary} />}
        </View>
    );
}

export default AddToFavButton;