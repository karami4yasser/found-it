import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ItemStyle from "./Item.styles";
import { ItemOverviewDto } from "../../typing/item";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AddToFavButton from "../AddToFavButton/AddToFavButton";
import { AddItemToFavApiCall } from "../../api/item/AddItemToFavApiCall";
import { useAuth } from "../../utils/AuthProvider";
import Toaster from "../../utils/Toaster";
import { COLORS } from "../../styles/theme";
import { isTokenExpired } from "../../utils/isTokenExpired";

type ItemProps = {
  itemOverviewDto: ItemOverviewDto;
  handleFunction: () => void;
};

export default function Item(props: ItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFav, setIsFav] = useState<Boolean>(props.itemOverviewDto.isFav);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };
  const {
    accessToken,
    refreshToken,
    autoRefreshAccessToken,
  } = useAuth();

  useEffect(() => {
    console.log(props.itemOverviewDto)
    setIsFav(props.itemOverviewDto.isFav);
  }, [props.itemOverviewDto.isFav]);

  const toggleFav = useCallback(async () => {
    if ((accessToken == null && refreshToken == null) || (accessToken === "" && refreshToken === "")) {
      Toaster.show("User is not authenticated", 1500, true, COLORS.red);
      return;
    }
    try {
      setLoading(true);
      if (isTokenExpired(accessToken)) {
        if (!(await autoRefreshAccessToken(refreshToken))) {
          navigateToRout("TabNavigation");
        }
      }
      let result = await AddItemToFavApiCall(props.itemOverviewDto.id, accessToken);
      console.log(result.status);
      if (result !== undefined && result.status == 200) {
        Toaster.show("Item added to favorites", 1500, true, COLORS.green);
        setIsFav(!isFav);
      } else {
        Toaster.show("Something went wrong, please try again", 1500, true, COLORS.green);
      }
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      Toaster.show("Something went wrong, please try again", 1500, true, COLORS.red);
      setLoading(false);
    }
  }, [accessToken, refreshToken, autoRefreshAccessToken, isFav, props.itemOverviewDto.id])

  const handleItemClick = () => {
    navigation.navigate("ItemDetailScreen", {
      itemId: props.itemOverviewDto.id,
    });
  };

  return (
    <View style={ItemStyle.container}>
      <TouchableOpacity style={ItemStyle.imageContainer} onPress={handleItemClick}>
        <Image
          //source={{ uri: props.itemOverviewDto.image }}
          source={{ uri: "https://cdn.ferrari.com/cms/network/media/img/resize/65365327f0abd70024e699ee-ferrari729151piufondo_1920x1080?" }}
          style={ItemStyle.itemImage}
        />
      </TouchableOpacity>
      <View style={ItemStyle.detailsContainer}>
        <View style={ItemStyle.detailsTopContainer}>
          <TouchableOpacity style={ItemStyle.detailsTopContainer} onPress={handleItemClick}>
            <Text
              style={ItemStyle.itemType}
            >
              {props.itemOverviewDto.type}
            </Text>
            <Text
              style={ItemStyle.bulletSeparator}
            >{'\u2B24'}</Text>
            <Text
              style={ItemStyle.itemDate}
            >
              {props.itemOverviewDto.date}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ItemStyle.addTofav} onPress={toggleFav}>
            <AddToFavButton isFav={isFav} onClick={() => console.log("clicked")} />
          </TouchableOpacity>
        </View>
        {props.itemOverviewDto.returned ? (
          <TouchableOpacity style={ItemStyle.returnedContainer} onPress={handleItemClick}>
            <Text style={ItemStyle.itemIsRetuned}>{"Returned"}</Text>
          </TouchableOpacity>
        ) : undefined}
        <TouchableOpacity style={ItemStyle.detailsBottomContainer} onPress={handleItemClick}>
          <Text style={ItemStyle.itemTitle}>{props.itemOverviewDto.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

