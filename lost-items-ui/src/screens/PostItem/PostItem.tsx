import React, { useCallback, useEffect, useState } from "react";
import {Image, LogBox, ScrollView, Text, View } from "react-native";
import styles, { factor } from "./PostItem.styles";
import SwitchSelector from "react-native-switch-selector";
import { COLORS } from "../../styles/theme";
import { ItemType } from "../../typing/item";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import Separator from "../../components/Separator/Separator";
import InputText from "../../components/InputText/InputText";
import SearchDropDown from "../../components/SearchDropDown/SearchDropDown";


export type PostItemProps = {
}

export type Coordinates = {
    latitude: number,
    longitude: number,
}

const PostItem = (props: PostItemProps) => {

    const [itemType, setItemType] = useState<ItemType>(ItemType.LOST)
    const [itemDescription, setItemDescription] = useState<string>("");
    const [itemTitle, setItemTitle] = useState<string>("");
    const [itemImage, setItemImage] = useState<string>("");
    const [itemLocation, setItemLocation] = useState<Coordinates | null>(null);
    const [itemTAR, setItemTAR] = useState<number | null>(null);
    const [itemDate, setItemDate] = useState<Date | null>(null);
    const [itemCategory, setItemCategory] = useState<string>("");

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])
      

    const changeCategory = useCallback((value: string) => {
        setItemCategory(value);
    }, [setItemCategory]);

    const handleItemTypeChange = useCallback((value: string) => {
        setItemType(ItemType[value as keyof typeof ItemType]);
    }, [setItemType]);

    const itemTypeOptions = [
        { label: "Lost", value: "LOST" },
        { label: "Found", value: "FOUND" },
    ]

    return (
        <View style={styles.postItemContainer}>
            <ScrollView style={styles.scrollingContainer} contentContainerStyle={styles.scrollingContentContainer}>
                <View style={styles.postItemHeadingTitleContainer}>
                    <Text style={styles.postItemHeadingTitle}>Post An Item</Text>
                </View>
                <SwitchSelector
                    bold
                    style={styles.postItemSwitchSelector}
                    options={itemTypeOptions}
                    initial={0}
                    textColor={COLORS.tertiary}
                    selectedColor={COLORS.white}
                    buttonColor={COLORS.tertiary}
                    borderColor={COLORS.tertiary}
                    onPress={handleItemTypeChange}
                    borderRadius={10 * factor}
                    fontSize={16 * factor}
                    height={30 * factor}
                />
                <View style={styles.postItemPositionInfoContainer}>
                    <View style={styles.postItemCoordinates}>
                        <Text style={styles.postItemKVKey}>Item {itemType === ItemType.FOUND ? 'Found' : 'Lost'} Coordinates :</Text>
                        <Text style={styles.postItemKVValue}>33.21133, -7.329302</Text>
                    </View>
                    <View style={styles.postItemTAR}>
                        <Text style={styles.postItemKVKey}>Target Area Radius :</Text>
                        <Text style={styles.postItemKVValue2}>180 m</Text>
                    </View>
                    <ButtonWithIcon name="Edit Position" icon="edit" handleFunction={() => console.log("Change")} />
                </View>
                <Separator />
                <View style={styles.postItemImagePickingContainer}>
                    <View style={styles.postItemImageContainer}>
                        <Image style={styles.postItemImage} source={{ uri: "https://i.pinimg.com/originals/7c/a8/81/7ca88144b295f9230ef913b61b29fe9d.jpg", }} />
                    </View>
                    <View style={styles.postItemImageEditContainer}>
                        <ButtonWithIcon name="Edit Image" icon="edit" handleFunction={() => console.log("Change")} />
                        <ButtonWithIcon name="Remove Image" icon="remove" handleFunction={() => console.log("Change")} />
                    </View>
                </View>
                <Separator />
                <View style={styles.postItemPrincipalInfoContainer}>
                <View style={styles.postItemTitleContainer}>
                    <InputText setValue={setItemTitle} currentValue={itemTitle} placeholder="Title..." type={"default"} hasError={false} />
                </View>
                <View style={styles.postItemDateContainer}>
                    <View style={styles.postItemDateTextContainer}>
                        <Text style={styles.postItemKVKey}>{itemType === ItemType.FOUND ? 'Found' : 'Lost'} Date :</Text>
                        <Text style={styles.postItemKVValue}>12/12/2020</Text>
                    </View>
                    <ButtonWithIcon name="Edit Date" icon="edit" handleFunction={() => console.log("Change")} />
                </View>
                <View style={styles.postItemCategoryContainer}>
                    <SearchDropDown placeholder="Category..." options={["Keys", "CIN", "money", "phone"]} onOptionSelected={changeCategory} />
                </View>
                <View style={styles.postItemDescriptionContainer}>
                    <InputText setValue={setItemDescription} currentValue={itemDescription} placeholder="Description..." type={"default"} hasError={false} numberOfLines={5} />
                </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default PostItem;