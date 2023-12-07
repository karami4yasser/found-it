import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";

import GoogleAuthButtonStyles from "./GoogleAuthButton.styles";

interface GoogleAuthButtonProps {
  onPress: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onPress }) => {
  return (
    <View style={GoogleAuthButtonStyles.container}>
      <View style={GoogleAuthButtonStyles.dividerContainer}>
        <Text style={GoogleAuthButtonStyles.divider}></Text>
        <Text style={GoogleAuthButtonStyles.orText}>or</Text>
        <Text style={GoogleAuthButtonStyles.divider}></Text>
      </View>
      <View style={GoogleAuthButtonStyles.socialContainer}>
        <TouchableOpacity
          style={GoogleAuthButtonStyles.button}
          onPress={onPress}
        >
          <View style={GoogleAuthButtonStyles.buttonContent}>
            <Image
              source={require("../../assets/images/google.png")}
              style={GoogleAuthButtonStyles.logo}
              resizeMode="contain"
            />
            <Text style={GoogleAuthButtonStyles.text}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleAuthButton;
