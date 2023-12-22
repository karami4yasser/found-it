import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type itemDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ItemDetailScreen"
>;

type itemDetailScreenProps = {
  route: itemDetailScreenRouteProp;
};

export default function ItemDetailScreen(props: itemDetailScreenProps) {
  console.log("ItemDetail render");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ItemDetail itemId={props.route.params.itemId} />
    </SafeAreaView>
  );
}
