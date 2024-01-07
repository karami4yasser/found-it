import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";

import SwitchSelector from "react-native-switch-selector";
import * as Icon from "react-native-feather";
import { COLORS } from "../../styles/theme";
import { ItemType } from "../../typing/item";
import MoreFilterStyle from "./MoreFilter.styles";
import SearchDropDown from "../SearchDropDown/SearchDropDown";
import Separator from "../Separator/Separator";
import * as Location from "expo-location";
import { factor, height, width } from "../../utils/stylesUtils";
import FoundItMap from "../FoundItMap/FoundItMap";
import Toaster from "../../utils/Toaster";
import { Coordinates } from "../../utils/MapUtils";
import { useSearchFilter } from "../../utils/SearchFilterProvider";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GetCategoriesApiCall } from "../../api/item/GetCategoriesApiCall";

interface ITheme {
  mainColor: string;
  activeTextColor: string;
}

const Themes: ITheme[] = [
  { mainColor: "#0047FF", activeTextColor: "#fff" },
  { mainColor: "#00D27A", activeTextColor: "#fff" },
  { mainColor: "#F5803E", activeTextColor: "#fff" },
  { mainColor: "#E63757", activeTextColor: "#fff" },
  { mainColor: "#D8E3FF", activeTextColor: "#0047FF" },
  { mainColor: "#CCF6E4", activeTextColor: "#00864E" },
  { mainColor: "#FDE6D8", activeTextColor: "#9D5228" },
  { mainColor: "#FAD7DD", activeTextColor: "#932338" },
];

const itemTypeOptions = [
  { label: "All", value: null },
  { label: "Lost", value: ItemType.LOST },
  { label: "Found", value: ItemType.FOUND },
];

export function MoreFilter() {
  const itemFilterOptions = useSearchFilter();
  const [showDateLeftCalendar, setShowDateLeftCalendar] =
    useState<Boolean>(false);
  const [showDateRightCalendar, setShowDateRightCalendar] =
    useState<Boolean>(false);
  const [showMap, setShowMap] = useState<Boolean>(false);
  const [theme, setTheme] = useState<ITheme | undefined>(Themes[0]);

  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );

  const [UserLocation, setUserLocation] = useState<Coordinates | null>(null);

  const [itemTAR, setItemTAR] = useState<number | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleItemTypeChange = useCallback(
    (value: ItemType | null) => {
      itemFilterOptions.setItemTypeFilter(value);
    },
    [itemFilterOptions.setItemTypeFilter]
  );
  const handleCategoryChange = useCallback(
    (value: string | null) => {
      itemFilterOptions.setCategoryFilter(value);
    },
    [itemFilterOptions.setCategoryFilter]
  );

  const handleDateLeftChange = useCallback(
    (value: DateType | null) => {
      itemFilterOptions.setDateLeftFilter(
        value ? dayjs(value).format("YYYY-MM-DD") : null
      );
      setShowDateLeftCalendar(false);
    },
    [setShowDateLeftCalendar]
  );

  const handleDateRightChange = useCallback(
    (value: DateType | null) => {
      itemFilterOptions.setDateRightFilter(
        value ? dayjs(value).format("YYYY-MM-DD") : null
      );
      setShowDateRightCalendar(false);
    },
    [setShowDateRightCalendar]
  );

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigateToRout = (routName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routName }],
    });
  };

  const handleSave = useCallback(() => {
    requestAnimationFrame(() => {
      if (selectedLocation) {
        itemFilterOptions.setLatitudeFilter(selectedLocation.latitude);
        itemFilterOptions.setLongitudeFilter(selectedLocation.longitude);
        itemFilterOptions.setRangeFilter(itemTAR);
      }

      navigateToRout("TabNavigation");
    });
  }, [selectedLocation, itemTAR]);

  const handleClear = useCallback(() => {
    requestAnimationFrame(() => {
      itemFilterOptions.clearItemFilterOptions();

      navigateToRout("TabNavigation");
    });
  }, []);

  const handleSaveLocation = useCallback(() => {
    setShowMap(false);
  }, []);

  const getCurrentSwitchSelectedType = () => {
    if (itemFilterOptions.itemFilterOptionsState.type == null) {
      return 0;
    } else if (itemFilterOptions.itemFilterOptionsState.type == ItemType.LOST) {
      return 1;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toaster.show(
          "Permission to access location was denied",
          1500,
          true,
          COLORS.red
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [setUserLocation]);

  if (loading)
    return (
      <>
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
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
            itemType={itemFilterOptions.itemFilterOptionsState.type}
            position={
              UserLocation
                ? UserLocation
                : {
                    latitude: 1,
                    longitude: 1,
                  }
            }
            setPosition={setSelectedLocation}
            tar={itemTAR ? itemTAR : 0}
            setTar={setItemTAR}
            closeMap={handleSaveLocation}
            immutable={false}
          />
        </View>
      )}
      {showDateLeftCalendar && (
        <View
          style={{
            opacity: 1,
            zIndex: 1000,
            position: "absolute",
            width: width,
            height: height,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {
            <View style={MoreFilterStyle.datePicker}>
              <DateTimePicker
                value={itemFilterOptions.itemFilterOptionsState.dateLeft}
                //minimumDate={dayjs().startOf('day')}
                maximumDate={
                  itemFilterOptions.itemFilterOptionsState.dateRight
                    ? dayjs(
                        itemFilterOptions.itemFilterOptionsState.dateRight
                      ).add(-1, "day")
                    : dayjs().add(-1, "day")
                }
                displayFullDays={false}
                onValueChange={(date) => {
                  handleDateLeftChange(date);
                }}
                headerButtonColor={theme?.mainColor}
                selectedItemColor={COLORS.tertiary}
                // eslint-disable-next-line react-native/no-inline-styles
                selectedTextStyle={{
                  fontWeight: "bold",
                  color: theme?.activeTextColor,
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                todayContainerStyle={{
                  borderWidth: 3,
                }}
                mode="date"
              />
            </View>
          }
        </View>
      )}
      {showDateRightCalendar && (
        <View
          style={{
            opacity: 1,
            zIndex: 1000,
            position: "absolute",
            width: width,
            height: height,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {
            <View style={MoreFilterStyle.datePicker}>
              <DateTimePicker
                value={itemFilterOptions.itemFilterOptionsState.dateRight}
                minimumDate={
                  itemFilterOptions.itemFilterOptionsState.dateLeft
                    ? dayjs(
                        itemFilterOptions.itemFilterOptionsState.dateLeft
                      ).add(1, "day")
                    : null
                }
                maximumDate={dayjs().add(1, "day")}
                displayFullDays={false}
                onValueChange={(date) => {
                  handleDateRightChange(date);
                }}
                headerButtonColor={theme?.mainColor}
                selectedItemColor={COLORS.tertiary}
                // eslint-disable-next-line react-native/no-inline-styles
                selectedTextStyle={{
                  fontWeight: "bold",
                  color: theme?.activeTextColor,
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                todayContainerStyle={{
                  borderWidth: 3,
                }}
                mode="date"
              />
            </View>
          }
        </View>
      )}

      <View style={MoreFilterStyle.mainContainer}>
        <SwitchSelector
          bold
          style={MoreFilterStyle.postItemSwitchSelector}
          options={itemTypeOptions}
          initial={getCurrentSwitchSelectedType()}
          textColor={COLORS.tertiary}
          selectedColor={COLORS.white}
          buttonColor={COLORS.tertiary}
          borderColor={COLORS.tertiary}
          onPress={handleItemTypeChange}
          borderRadius={10 * factor}
          fontSize={16 * factor}
          height={30 * factor}
        />

        <View style={MoreFilterStyle.searchDropDown}>
          <SearchDropDown
            placeholder="Category..."
            options={categories}
            onOptionSelected={handleCategoryChange}
          />
        </View>

        <View style={MoreFilterStyle.locationFilter}>
          <Text style={MoreFilterStyle.text}>
            {itemFilterOptions.itemFilterOptionsState.latitude &&
            itemFilterOptions.itemFilterOptionsState.longitude
              ? `Selected Location: ${itemFilterOptions.itemFilterOptionsState.latitude.toPrecision(
                  5
                )},${itemFilterOptions.itemFilterOptionsState.longitude.toPrecision(
                  5
                )} `
              : "Choose Location in map :"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowMap(true)}
            style={MoreFilterStyle.iconCalendar}
          >
            <Icon.Map
              color={COLORS.tertiary}
              width={25 * factor}
              height={25 * factor}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>

        <View style={MoreFilterStyle.date}>
          <Text style={MoreFilterStyle.text}>Posted Between :</Text>
          <Text style={MoreFilterStyle.dateText}>
            {itemFilterOptions.itemFilterOptionsState.dateLeft
              ? dayjs(itemFilterOptions.itemFilterOptionsState.dateLeft).format(
                  "YYYY-MM-DD"
                )
              : "Choose Start Date"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowDateLeftCalendar(true)}
            style={MoreFilterStyle.iconCalendar}
          >
            <Icon.Calendar
              color={COLORS.tertiary}
              width={25 * factor}
              height={25 * factor}
              strokeWidth={3}
            />
          </TouchableOpacity>
          <Text style={MoreFilterStyle.dateText}>
            {itemFilterOptions.itemFilterOptionsState.dateRight
              ? dayjs(
                  itemFilterOptions.itemFilterOptionsState.dateRight
                ).format("YYYY-MM-DD")
              : "Choose End Date"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowDateRightCalendar(true)}
            style={MoreFilterStyle.iconCalendar}
          >
            <Icon.Calendar
              color={COLORS.tertiary}
              width={25 * factor}
              height={25 * factor}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={MoreFilterStyle.saveButton}
            onPress={handleSave}
          >
            <Text style={MoreFilterStyle.saveButtonText}>Save Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={MoreFilterStyle.saveButton}
            onPress={handleClear}
          >
            <Text style={MoreFilterStyle.saveButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
          }}
        ></View>
      </View>
    </>
  );
}
