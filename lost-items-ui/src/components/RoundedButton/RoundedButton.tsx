import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_WEIGHT, SIZES } from '../../styles/theme'
import RoundedButtonStyle from './RoundedButton.styles';


type RoundedButtonProps = {
    name: string,
    handleFunction:()=>void;
};
export default function RoundedButton(props: RoundedButtonProps) {
    return (
        <Pressable style={RoundedButtonStyle.RoundedButton} onPress={props.handleFunction}>
            <Text style={RoundedButtonStyle.textButton}>{props.name}</Text>
        </Pressable>
    )
}