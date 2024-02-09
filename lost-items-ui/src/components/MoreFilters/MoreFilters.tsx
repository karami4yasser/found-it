import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";

import SwitchSelector from "react-native-switch-selector";
import * as Icon from "react-native-feather";
import { COLORS } from "../../styles/theme";
import { ItemType } from "../../typing/item";
import MoreFilterStyle from "./MoreFilters.styles";
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
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";

const itemTypeOptions = [
  { label: "All", value: null },
  { label: "Lost", value: ItemType.LOST },
  { label: "Found", value: ItemType.FOUND },
];
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
export function MoreFilters() {
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
  const [selectedItemType, setSelectedItemType] = useState<ItemType | null>(
    null
  );
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);
  const [selectedDateLeftFilter, setSelectedDateLeftFilter] = useState<
    string | null
  >(null);
  const [selectedDateRightFilter, setSelectedDateRightFilter] = useState<
    string | null
  >(null);

  const [selectedItemStatus, setSelectedItemStatus] = useState<boolean | null>(
    null
  );

  const [UserLocation, setUserLocation] = useState<Coordinates | null>(null);

  const [itemTAR, setItemTAR] = useState<number | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
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
      setSelectedItemType(value);
    },
    [selectedItemType]
  );
  const handleCategoryChange = useCallback(
    (value: string | null) => {
      setSelectedCategoryFilter(value);
    },
    [selectedCategoryFilter]
  );

  const handleItemStatusChange = useCallback(
    (value: boolean | null) => {
      setSelectedItemStatus(value);
    },
    [selectedItemStatus]
  );

  const handleDateLeftChange = useCallback(
    (value: DateType | null) => {
      setSelectedDateLeftFilter(
        value ? dayjs(value).format("YYYY-MM-DD") : null
      );
      setShowDateLeftCalendar(false);
    },
    [setShowDateLeftCalendar]
  );

  const handleDateRightChange = useCallback(
    (value: DateType | null) => {
      setSelectedDateRightFilter(
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
      itemFilterOptions.setLatitudeFilter(
        selectedLocation ? selectedLocation.latitude : null
      );
      itemFilterOptions.setLongitudeFilter(
        selectedLocation ? selectedLocation.longitude : null
      );
      itemFilterOptions.setRangeFilter(itemTAR);

      itemFilterOptions.setCategoryFilter(selectedCategoryFilter);
      itemFilterOptions.setDateLeftFilter(selectedDateLeftFilter);
      itemFilterOptions.setDateLeftFilter(selectedDateRightFilter);
      itemFilterOptions.setItemTypeFilter(selectedItemType);
      itemFilterOptions.setReturnedFilter(selectedItemStatus);

      navigateToRout("TabNavigation");
    });
  }, [
    selectedLocation,
    itemTAR,
    selectedCategoryFilter,
    selectedDateLeftFilter,
    selectedDateRightFilter,
    selectedItemType,
    selectedItemStatus,
  ]);

  const handleClear = useCallback(() => {
    requestAnimationFrame(() => {
      setSelectedLocation(null);
      setSelectedCategoryFilter(null);
      setSelectedDateLeftFilter(null);
      setSelectedDateRightFilter(null);
      setSelectedItemType(null);
      itemFilterOptions.clearItemFilterOptions();
      navigateToRout("TabNavigation");
    });
  }, []);

  const handleSaveLocation = useCallback(() => {
    setShowMap(false);
  }, []);

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

  const handleOpenMap = () => {
    setShowMap(true);
  };

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
            itemType={selectedItemType}
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
                value={selectedDateLeftFilter}
                //minimumDate={dayjs().startOf('day')}
                maximumDate={
                  selectedDateRightFilter
                    ? dayjs(selectedDateRightFilter).add(-1, "day")
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
                value={selectedDateRightFilter}
                minimumDate={
                  selectedDateLeftFilter
                    ? dayjs(selectedDateLeftFilter).add(1, "day")
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
        <ScrollView
          style={MoreFilterStyle.scrollingContainer}
          contentContainerStyle={MoreFilterStyle.scrollingContentContainer}
        >
          <View style={MoreFilterStyle.headerContainer}>
            <TouchableOpacity
              style={MoreFilterStyle.arrowBack}
              onPress={() => {
                navigateToRout("TabNavigation");
              }}
            >
              <Icon.ArrowLeft
                color={COLORS.tertiary}
                width={20 * factor}
                height={20 * factor}
              />
            </TouchableOpacity>
            <View style={MoreFilterStyle.HeaderCenter}>
              <Text style={[MoreFilterStyle.BoldText]}>Filter Items</Text>
            </View>
            <TouchableOpacity
              style={MoreFilterStyle.ButtonClickheader}
              onPress={handleClear}
            >
              <Text
                style={[MoreFilterStyle.textButton, { color: COLORS.tertiary }]}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={MoreFilterStyle.containerWithTitle}>
            <View style={MoreFilterStyle.ContainerName}>
              <Text
                style={[
                  MoreFilterStyle.BoldText,
                  {
                    paddingBottom: 20 * factor,
                  },
                ]}
              >
                Item Type
              </Text>
            </View>
            <View style={[MoreFilterStyle.postItemSwitchSelector]}>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemType == null
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemTypeChange(null);
                }}
              >
                <Text
                  style={[
                    MoreFilterStyle.textButton,
                    { color: COLORS.tertiary },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemType == ItemType.LOST
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemTypeChange(ItemType.LOST);
                }}
              >
                <Text style={MoreFilterStyle.textButton}>Lost</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemType == ItemType.FOUND
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemTypeChange(ItemType.FOUND);
                }}
              >
                <Text style={MoreFilterStyle.textButton}>Found</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={MoreFilterStyle.containerWithTitle}>
            <View style={MoreFilterStyle.ContainerName}>
              <Text
                style={[
                  MoreFilterStyle.BoldText,
                  {
                    paddingBottom: 20 * factor,
                  },
                ]}
              >
                Item Position Estimation
              </Text>
            </View>
            <View style={MoreFilterStyle.postItemPositionInfoContainer}>
              <View style={MoreFilterStyle.postItemCoordinates}>
                <Text style={MoreFilterStyle.postItemKVKey}>
                  Item Position :{" "}
                </Text>
                <Text style={MoreFilterStyle.postItemKVValue}>
                  {selectedLocation
                    ? selectedLocation.latitude.toPrecision(5)
                    : null}{" "}
                  {selectedLocation
                    ? selectedLocation.longitude.toPrecision(5)
                    : null}
                </Text>
              </View>
              <View style={MoreFilterStyle.postItemTAR}>
                <Text style={MoreFilterStyle.postItemKVKey}>
                  Target Area Radius :
                </Text>
                <Text style={MoreFilterStyle.postItemKVValue2}>
                  {itemTAR && itemTAR + " m"}
                </Text>
              </View>

              <ButtonWithIcon
                name="Edit Position"
                icon="edit"
                handleFunction={handleOpenMap}
              />
            </View>
          </View>

          <View style={MoreFilterStyle.containerWithTitle}>
            <View style={MoreFilterStyle.ContainerName}>
              <Text
                style={[
                  MoreFilterStyle.BoldText,
                  {
                    paddingBottom: 20 * factor,
                  },
                ]}
              >
                Category
              </Text>
            </View>

            <View style={MoreFilterStyle.searchDropDown}>
              <SearchDropDown
                placeholder="Category..."
                options={categories}
                onOptionSelected={handleCategoryChange}
              />
            </View>
          </View>

          <View style={MoreFilterStyle.containerWithTitle}>
            <View style={MoreFilterStyle.ContainerName}>
              <Text
                style={[
                  MoreFilterStyle.BoldText,
                  {
                    paddingBottom: 20 * factor,
                  },
                ]}
              >
                Date Range
              </Text>
            </View>

            <View style={MoreFilterStyle.date}>
              <View style={MoreFilterStyle.dateOption}>
                <Text
                  style={[
                    MoreFilterStyle.dateText,
                    { width: 60 * factor * factor },
                  ]}
                >
                  From:
                </Text>
                <View style={MoreFilterStyle.dateOptionContainer}>
                  <TouchableOpacity
                    onPress={() => setShowDateLeftCalendar(true)}
                    style={MoreFilterStyle.iconCalendar}
                  >
                    <Icon.Calendar
                      color={COLORS.black}
                      width={20 * factor}
                      height={20 * factor}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                  <Text style={MoreFilterStyle.dateText}>
                    {selectedDateLeftFilter
                      ? dayjs(selectedDateLeftFilter).format("YYYY-MM-DD")
                      : "Date ..."}
                  </Text>
                </View>
              </View>
              <View style={MoreFilterStyle.dateOption}>
                <Text
                  style={[
                    MoreFilterStyle.dateText,
                    { width: 60 * factor * factor },
                  ]}
                >
                  To:
                </Text>
                <View style={MoreFilterStyle.dateOptionContainer}>
                  <TouchableOpacity
                    onPress={() => setShowDateRightCalendar(true)}
                    style={MoreFilterStyle.iconCalendar}
                  >
                    <Icon.Calendar
                      color={COLORS.black}
                      width={20 * factor}
                      height={20 * factor}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                  <Text style={MoreFilterStyle.dateText}>
                    {selectedDateRightFilter
                      ? dayjs(selectedDateRightFilter).format("YYYY-MM-DD")
                      : "Date ..."}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={MoreFilterStyle.containerWithTitle}>
            <View style={MoreFilterStyle.ContainerName}>
              <Text
                style={[
                  MoreFilterStyle.BoldText,
                  {
                    paddingBottom: 20 * factor,
                  },
                ]}
              >
                Item Status
              </Text>
            </View>
            <View style={[MoreFilterStyle.postItemSwitchSelector]}>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemStatus == null
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemStatusChange(null);
                }}
              >
                <Text
                  style={[
                    MoreFilterStyle.textButton,
                    { color: COLORS.tertiary },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemStatus == false
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemStatusChange(false);
                }}
              >
                <Text style={MoreFilterStyle.textButton}>Available</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  MoreFilterStyle.ButtonClick,

                  selectedItemStatus == true
                    ? {
                        backgroundColor: COLORS.grayLight,
                        borderColor: COLORS.tertiary,
                      }
                    : null,
                ]}
                onPress={() => {
                  handleItemStatusChange(true);
                }}
              >
                <Text style={MoreFilterStyle.textButton}>Returned</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              style={MoreFilterStyle.saveButton}
              onPress={handleSave}
            >
              <Text style={MoreFilterStyle.saveButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
            }}
          ></View>
        </ScrollView>
      </View>
    </>
  );
}
