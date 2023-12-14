import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox, View } from "react-native";
import React from "react";
import { height, width } from "../../utils/stylesUtils";
import { COLORS } from "../../styles/theme";
import { MoreFilter } from "../../components/MoreFilter/MoreFilter";

export default function MoreFilters() {
  console.log("MoreFilters render");

  useEffect(() => {
    LogBox.ignoreLogs(["AxiosError: Network Error"]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: width,
          height: height,
          backgroundColor: COLORS.lightWhite,
        }}
      >
        <MoreFilter />
      </View>
    </SafeAreaView>
  );
}
