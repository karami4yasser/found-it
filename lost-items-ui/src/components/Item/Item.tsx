import { Image, Text, View } from "react-native";
import React from "react";
import ItemStyle from "./Item.styles";
import { ItemOverviewDto } from "../../typing/item";

type ItemProps = {
  itemOverviewDto: ItemOverviewDto;
  handleFunction: () => void;
};

export default function Item(props: ItemProps) {
  return (
    <View style={ItemStyle.container}>
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
    </View>
  );
}
