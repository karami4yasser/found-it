import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type itemDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ItemDetailScreen"
>;

type ItemDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "ItemDetailScreen"
>;

export default function ItemDetailScreen(props: ItemDetailProps) {
  console.log("ItemDetail render");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ItemDetail route={props.route} navigation={props.navigation} />
    </SafeAreaView>
  );
}
