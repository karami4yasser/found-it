import React, { useCallback, useEffect, useState } from "react";
import { Image, LogBox, ScrollView, Text, View } from "react-native";
import styles, { factor } from "./PostItem.styles";
import SwitchSelector from "react-native-switch-selector";
import { COLORS } from "../../styles/theme";
import { ItemType } from "../../typing/item";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import Separator from "../../components/Separator/Separator";
import InputText from "../../components/InputText/InputText";
import SearchDropDown from "../../components/SearchDropDown/SearchDropDown";
import FoundItMap from "../../components/FoundItMap/FoundItMap";
import { MAX_NON_PREMIUM_ITEM_POST_RANGE } from "../../utils/MapUtils";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Toaster from "../../utils/Toaster";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { height, width } from "../../utils/stylesUtils";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { CreateItemApiCall } from "../../api/item/CreateItemApiCall";
import { useAuth } from "../../utils/AuthProvider";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Loading from "../Loading/Loading";
import { GetCategoriesApiCall } from "../../api/item/GetCategoriesApiCall";

export type PostItemProps = {};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type FieldErrors = {
    title: boolean,
    category: boolean,
    description: boolean
};

const PostItem = (props: PostItemProps) => {
  const [itemType, setItemType] = useState<ItemType>(ItemType.LOST);
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemImage, setItemImage] = useState<string>("");
  const [itemPosition, setItemPosition] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [itemTAR, setItemTAR] = useState<number>(100);
  const [itemDate, setItemDate] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [itemCategory, setItemCategory] = useState<string>("");
  const [mapOpened, setMapOpened] = useState<boolean>(false);
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const {
    accessToken,
    refreshToken,
    setTheRefreshToken,
    setTheAccessToken,
    autoRefreshAccessToken,
  } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [hasError, setHasError] = useState<FieldErrors>({
    title: false,
    category: false,
    description: false,
  });

  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };

  useEffect(() => {
    (async () => {
        setLoading(true);
        const response = await GetCategoriesApiCall();
        if (response.status === 200) {
            setCategories(response.data);
            setLoading(false);
        } else {
            Toaster.show("Unknown error : categories!", 1500, true, COLORS.red);
            setLoading(false);
        }
    })();
  }, [setCategories]);

  const validFields = useCallback(() : boolean => {
    let error = true;
    if (itemTitle === "") {
        Toaster.show("Title is required.", 1500, true, COLORS.red);
        error = false;
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, title: true }));
    } else {
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, title: false }));
    }
    if (itemDescription === "") {
        Toaster.show("Description is required.", 1500, true, COLORS.red);
        error = false;
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, description: true }));
    } else {
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, description: false }));
    }
    if (itemCategory === "") {
        Toaster.show("Category is required.", 1500, true, COLORS.red);
        error = false;
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, category: true }));
    } else {
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, category: false }));
    }
    if (!categories.includes(itemCategory)) {
        Toaster.show("Category is invalid.", 1500, true, COLORS.red);
        error = false;
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, category: true }));
    } else {
        setHasError((oldErrors: FieldErrors) => ({ ...oldErrors, category: false }));
    }
    return error;
  }, [itemTitle, itemDescription, itemCategory, categories, hasError, setHasError]);

  const createItem = useCallback(async () => {
    if (!validFields()) {
        return;
    }
    try {
      setLoading(true);
      if (isTokenExpired(accessToken)) {
        if (!(await autoRefreshAccessToken(refreshToken))) {
          navigation.navigate("SignIn");
        }
      }
      const response = await CreateItemApiCall(accessToken, {
        title: itemTitle,
        description: itemDescription,
        type: itemType,
        category: itemCategory,
        date: itemDate,
        latitude: itemPosition.latitude,
        longitude: itemPosition.longitude,
        range: itemTAR,
        photo: itemImage,
      });
      if (response.status === 201) {
        Toaster.show("Item Created Successfuly.", 1500, true, COLORS.green);
        setLoading(false);
        navigateToRout("Feed");
      } else if (response.status === 401) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setLoading(false);
        navigateToRout("SignIn");
      } else if (response.status === 404) {
        Toaster.show(response.data.message, 1500, true, COLORS.red);
        setLoading(false);
        navigateToRout("SignUp");
      } else if (response.status === 400) {
        response.data.errors.forEach((err: any) => {
          Toaster.show(err, 1500, true, COLORS.red);
        });
        setLoading(false);
      } else {
        console.log(JSON.stringify(response));
        Toaster.show("Unknown error 1!", 1500, true, COLORS.red);
        setLoading(false);
      }
    } catch (error) {
    console.log(JSON.stringify(error));
      Toaster.show("Unknown Error 2!", 1500, true, COLORS.red);
      setLoading(false);
    }
  }, [
    loading,
    setLoading,
    accessToken,
    refreshToken,
    setTheAccessToken,
    setTheRefreshToken,
    autoRefreshAccessToken,
    itemTitle,
    itemDescription,
    itemType,
    itemCategory,
    itemDate,
    itemPosition,
    itemTAR,
    itemImage,
    validFields
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toaster.show(
          "Permission to access location was denied",
          1500,
          true,
          COLORS.red
        );
        return;
      }
      let location = await getCurrentPositionAsync({});
      setItemPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [setItemPosition]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const changeCategory = useCallback(
    (value: string) => {
      setItemCategory(value);
    },
    [setItemCategory]
  );

  const handleItemTypeChange = useCallback(
    (value: string) => {
      setItemType(ItemType[value as keyof typeof ItemType]);
      if (value === "LOST" && itemTAR > MAX_NON_PREMIUM_ITEM_POST_RANGE) {
        setItemTAR(MAX_NON_PREMIUM_ITEM_POST_RANGE);
      }
    },
    [setItemType, setItemTAR, itemTAR]
  );

  const handleDateChange = useCallback(
    (value: DateType | null) => {
      setItemDate(value ? dayjs(value).format("YYYY-MM-DD") : itemDate);
      setShowCalender(false);
    },
    [setShowCalender, itemDate]
  );

  const handleOpenMap = useCallback(() => {
    setMapOpened(true);
  }, [setMapOpened]);

  const itemTypeOptions = [
    { label: "Lost", value: "LOST" },
    { label: "Found", value: "FOUND" },
  ];

  {console.log(hasError.title)}

  return loading ? (
        <Loading />
    ) : mapOpened ? (
    <FoundItMap
      itemType={itemType}
      position={itemPosition}
      setPosition={setItemPosition}
      tar={itemTAR}
      setTar={setItemTAR}
      closeMap={() => setMapOpened(false)}
    />
  ) : (
    <>
      {showCalender && (
        <View
          style={{
            opacity: 1,
            zIndex: 1000,
            position: "absolute",
            width: width,
            height: height,
            flex: 1,
            marginTop: factor == 1 ? "30%" : "50%",
            alignItems: "center",
          }}
        >
          {
            <View style={styles.datePicker}>
              <DateTimePicker
                value={itemDate}
                maximumDate={dayjs().add(0, "day")}
                displayFullDays={false}
                onValueChange={handleDateChange}
                selectedItemColor={COLORS.tertiary}
                calendarTextStyle={styles.callenderTextStyle}
                selectedTextStyle={styles.callenderSelectedTextStyle}
                mode="date"
                headerTextStyle={styles.callenderTextStyle}
                weekDaysTextStyle={styles.callenderTextStyle}
              />
            </View>
          }
        </View>
      )}
      <View style={styles.postItemContainer}>
        <ScrollView
          style={styles.scrollingContainer}
          contentContainerStyle={styles.scrollingContentContainer}
        >
          <View style={styles.postItemHeadingTitleContainer}>
            <Text style={styles.postItemHeadingTitle}>Post An Item</Text>
          </View>
          <SwitchSelector
            bold
            style={styles.postItemSwitchSelector}
            options={itemTypeOptions}
            initial={itemType === ItemType.LOST ? 0 : 1}
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
              <Text style={styles.postItemKVKey}>
                Item {itemType === ItemType.FOUND ? "Found" : "Lost"}{" "}
                Coordinates :
              </Text>
              <Text style={styles.postItemKVValue}>
                {itemPosition.latitude.toPrecision(9)},{" "}
                {itemPosition.longitude.toPrecision(9)}
              </Text>
            </View>
            <View style={styles.postItemTAR}>
              <Text style={styles.postItemKVKey}>Target Area Radius :</Text>
              <Text style={styles.postItemKVValue2}>{itemTAR} m</Text>
            </View>
            <ButtonWithIcon
              name="Edit Position"
              icon="edit"
              handleFunction={handleOpenMap}
            />
          </View>
          <Separator />
          <View style={styles.postItemImagePickingContainer}>
            <View style={styles.postItemImageContainer}>
              <Image
                style={styles.postItemImage}
                source={{
                  uri: "https://i.pinimg.com/originals/7c/a8/81/7ca88144b295f9230ef913b61b29fe9d.jpg",
                }}
              />
            </View>
            <View style={styles.postItemImageEditContainer}>
              <ButtonWithIcon
                name="Edit Image"
                icon="edit"
                handleFunction={() => console.log("Change")}
              />
              <ButtonWithIcon
                name="Remove Image"
                icon="remove"
                handleFunction={() => console.log("Change")}
              />
            </View>
          </View>
          <Separator />
          <View style={styles.postItemPrincipalInfoContainer}>
            <View style={styles.postItemTitleContainer}>
              <InputText
                page="postItem"
                setValue={setItemTitle}
                currentValue={itemTitle}
                placeholder="Title..."
                type={"default"}
                hasError={hasError.title}
              />
            </View>
            <View style={styles.postItemDateContainer}>
              <View style={styles.postItemDateTextContainer}>
                <Text style={styles.postItemKVKey}>
                  {itemType === ItemType.FOUND ? "Found" : "Lost"} Date :
                </Text>
                <Text style={styles.postItemKVValue}>{itemDate}</Text>
              </View>
              <ButtonWithIcon
                name="Edit Date"
                icon="edit"
                handleFunction={() => setShowCalender(true)}
              />
            </View>
            <View style={styles.postItemCategoryContainer}>
              <SearchDropDown
                placeholder="Category..."
                options={categories}
                onOptionSelected={changeCategory}
                hasError={hasError.category}
              />
            </View>
            <View style={styles.postItemDescriptionContainer}>
              <InputText
                page="postItem"
                setValue={setItemDescription}
                currentValue={itemDescription}
                placeholder="Description..."
                type={"default"}
                hasError={hasError.description}
                numberOfLines={5}
              />
            </View>
          </View>
          <View style={{ marginBottom: 30 * factor, flex: 3 }}>
            <SubmitButton name="Post Item" handleFunction={createItem} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PostItem;
