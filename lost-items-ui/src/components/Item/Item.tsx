import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ItemStyle from "./Item.styles";
import { ItemOverviewDto } from "../../typing/item";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ItemProps = {
  itemOverviewDto: ItemOverviewDto;
  handleFunction: () => void;
};

export default function Item(props: ItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={ItemStyle.container}
      onPress={() =>
        navigation.navigate("ItemDetailScreen", {
          itemId: props.itemOverviewDto.id,
        })
      }
    >
      <View style={ItemStyle.imageContainer}>
        <Image
          //source={{ uri: props.itemOverviewDto.image }}
          source={{ uri: "https://picsum.photos/200/300?image=100" }}
          style={ItemStyle.itemImage}
        />
      </View>
      <View style={ItemStyle.detailsContainer}>
        <View style={ItemStyle.detailsTopContainer}>
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={ItemStyle.itemTitle}
          >
            {props.itemOverviewDto.title}
          </Text>
          <Text style={ItemStyle.itemIsRetuned}>
            {props.itemOverviewDto.returned ? "Returned" : ""}
          </Text>
        </View>
        <View style={ItemStyle.detailsBottomContainer}>
          <Text style={ItemStyle.itemType}>{props.itemOverviewDto.type}</Text>
          <Text style={ItemStyle.itemDate}>
            in {props.itemOverviewDto.postDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
