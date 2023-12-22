import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ItemDetailsDto, ItemType } from "../../typing/item";
import Toaster from "../../utils/Toaster";
import { COLORS } from "../../styles/theme";
import { GetItemDetailsDtoApiCall } from "../../api/item/GetItemDetailsDtoApiCall";
import { factor, height, width } from "../../utils/stylesUtils";
import ItemDetailsStyle from "./ItemDetail.styles";
import * as Icon from "react-native-feather";
import Separator from "../Separator/Separator";
import { FontAwesome } from "@expo/vector-icons";
import FoundItMap from "../FoundItMap/FoundItMap";
type ItemDetailProps = {
  itemId: string;
};
export default function ItemDetail(props: ItemDetailProps) {
  console.log("ItemDetail render");

  const [loading, setLoading] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(false);

  /* const auth = useAuth() if the user post is the current user don't show contact options  */

  const [itemDetails, setItemDetails] = useState<ItemDetailsDto | null>(null);

  useEffect(() => {
    (async () => {
      const response = await GetItemDetailsDtoApiCall(props.itemId);
      if (response.status === 200) {
        setItemDetails(response.data);
        setLoading(false);
      } else {
        Toaster.show("Unknown error : ItemDetailsDto!", 1500, true, COLORS.red);
        setLoading(false);
      }
    })();
  }, [setItemDetails]);

  const handleCloseMap = () => {
    setShowMap(false);
  };

  if (loading) return <Text>Loaddinhggg</Text>;

  return (
    <>
      {showMap && (
        <View
          style={{
            opacity: 1,
            zIndex: 1000,
            position: "absolute",
            width: width,
            height: height,
            flex: 1,
          }}
        >
          <FoundItMap
            itemType={itemDetails?.type ? itemDetails.type : ItemType.FOUND}
            position={{
              latitude: itemDetails?.latitude ? itemDetails.latitude : 1,
              longitude: itemDetails?.longitude ? itemDetails.longitude : 1,
            }}
            setPosition={() => {}}
            tar={itemDetails?.range ? itemDetails.range : 0}
            setTar={() => {}}
            closeMap={handleCloseMap}
            immutable={true}
          />
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        <View style={ItemDetailsStyle.itemImageContainer}>
          <Image
            source={{
              uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png",
            }}
            style={ItemDetailsStyle.itemImage}
          />
        </View>
        <View style={ItemDetailsStyle.textDetailsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text numberOfLines={2} style={ItemDetailsStyle.textBigBlack}>
              {itemDetails?.title}
            </Text>
            <Text style={ItemDetailsStyle.textSmallTertiary}>
              posted in {itemDetails?.postDate}
            </Text>
          </View>
          <View>
            <Text style={ItemDetailsStyle.textSmallBlack}>
              {itemDetails?.description}
              {/* we need to controle the descprion number of charchters  */}
            </Text>
          </View>
        </View>
        <View style={ItemDetailsStyle.extraInfoDetailsContainer}>
          <View>
            <Text style={ItemDetailsStyle.textItemState}>
              {itemDetails?.type}
            </Text>
            <TouchableOpacity
              style={{
                paddingBottom: 20,
              }}
              onPress={() => {
                setShowMap(true);
              }}
            >
              <Icon.Map
                color={COLORS.tertiary}
                width={25 * factor}
                height={25 * factor}
                strokeWidth={3}
              />
            </TouchableOpacity>
            <Text style={ItemDetailsStyle.textItemState}>Status</Text>
          </View>
          <View
            style={{
              marginLeft: "10%",
            }}
          >
            <Text style={ItemDetailsStyle.textSmallBlack}>
              in {itemDetails?.date}
            </Text>
            <Text style={ItemDetailsStyle.textSmallBlack}>Show in Map</Text>
            <Text style={ItemDetailsStyle.textSmallBlack}>
              {itemDetails?.returned ? "Returned" : "Available"}
            </Text>
          </View>
        </View>
        <View style={ItemDetailsStyle.userContactContainer}>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Image
              source={{
                uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png",
              }}
              style={ItemDetailsStyle.userImage}
            />
            <Text style={ItemDetailsStyle.userName}>
              {" "}
              {itemDetails?.posterFullName}
            </Text>
          </View>
          <View style={ItemDetailsStyle.button}>
            <Text style={ItemDetailsStyle.buttonText}>Contact</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${itemDetails?.posterPhoneNumber}`)
                .then((data) => {
                  console.log("phone Opened");
                })
                .catch(() => {
                  Toaster.show("Make sure phone installed on your device");
                })
            }
          >
            <FontAwesome name="phone" size={25 * factor} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://api.whatsapp.com/send?text=hello&phone=${itemDetails?.posterPhoneNumber}`
              )
                .then((data) => {
                  console.log("WhatsApp Opened");
                })
                .catch(() => {
                  Toaster.show("Make sure WhatsApp installed on your device");
                })
            }
          >
            <FontAwesome
              name="whatsapp"
              size={25 * factor}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
