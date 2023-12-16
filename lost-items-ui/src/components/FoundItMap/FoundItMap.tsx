import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import MapView, {
  Circle,
  MapPressEvent,
  Marker,
  MarkerDragEvent,
} from "react-native-maps";
import { ItemType } from "../../typing/item";
import Slider from "@react-native-community/slider";
import { COLORS } from "../../styles/theme";
import {
  Coordinates,
  MAX_ITEM_POST_RANGE,
  MAX_NON_PREMIUM_ITEM_POST_RANGE,
} from "../../utils/MapUtils";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./FounditMap.styles";

export type FoundItMap = {
  itemType: ItemType | null;
  position: Coordinates;
  tar: number;
  setTar: (tar: number) => void;
  setPosition: (location: Coordinates) => void;
  closeMap: () => void;
};

export default function FoundItMap(props: FoundItMap) {
  const [tempPosition, setTempPosition] = React.useState<Coordinates>({
    latitude: props.position.latitude,
    longitude: props.position.longitude,
  });

  const [tempTar, setTempTar] = React.useState<number>(props.tar);

  useEffect(() => {
    setTempPosition({
      latitude: props.position.latitude,
      longitude: props.position.longitude,
    });
    setTempTar(props.tar);
  }, [props.position, props.tar]);

  const handleSavePosition = useCallback(() => {
    props.setPosition(tempPosition);
    props.setTar(tempTar);
    props.closeMap();
  }, [props, tempPosition, tempTar]);

  const handleTarSliderChange = useCallback(
    (newVal: number) => {
      setTempTar(newVal);
    },
    [setTempTar]
  );

  const handleClickMap = useCallback(
    (event: MapPressEvent) => {
      setTempPosition(event.nativeEvent.coordinate);
    },
    [setTempPosition]
  );

  const handleMarkerDrag = useCallback(
    (event: MarkerDragEvent) => {
      setTempPosition(event.nativeEvent.coordinate);
    },
    [setTempPosition]
  );

  return (
    <View style={styles.mapPageContainer}>
      <MapView
        provider="google"
        style={styles.mapView}
        initialRegion={{
          latitude: tempPosition.latitude,
          longitude: tempPosition.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        onPress={handleClickMap}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={tempPosition}
          onDrag={handleMarkerDrag}
          draggable={true}
          pinColor={COLORS.tertiary}
        />
        <Circle
          center={tempPosition}
          strokeColor={COLORS.tertiary}
          fillColor={"#6b240c1a"}
          radius={tempTar}
        />
      </MapView>
      <View style={styles.mapSettingsContainer}>
        <View style={styles.mapSettingsTitleContainer}>
          <Text style={styles.mapSettingsTitleText}>Select Location</Text>
        </View>
        <View style={styles.mapSettingsPositionContainer}>
          <Text style={styles.mapSettingsKVKey}>
            {props.itemType && props.itemType === ItemType.FOUND ? "Found" : ""}{" "}
            {props.itemType && props.itemType === ItemType.LOST ? "Lost" : ""}{" "}
            {props.itemType === null ? "All" : ""} Coordinates :
          </Text>
          <Text style={styles.mapSettingsKVValue}>
            {tempPosition.latitude.toPrecision(9)},{" "}
            {tempPosition.longitude.toPrecision(9)}
          </Text>
        </View>
        <View style={styles.mapSettingsPositionContainer}>
          <Text style={styles.mapSettingsKVKey}>TAR :</Text>
          <Text style={styles.mapSettingsKVValue}>{tempTar} m</Text>
        </View>
        {/* Did not include premium for now since we don't have it, will add it in the future */}
        <View style={styles.mapSettingsTARContainer}>
          <View style={styles.mapSettingsTarBoundries}>
            <Text style={styles.mapSettingsTarBoundryValue}>0 m</Text>
            <Text style={styles.mapSettingsTarBoundryValue}>
              {props.itemType === ItemType.FOUND
                ? MAX_ITEM_POST_RANGE
                : MAX_NON_PREMIUM_ITEM_POST_RANGE}{" "}
              m
            </Text>
          </View>
          <Slider
            style={styles.mapSettingsTARSlider}
            minimumValue={0}
            maximumValue={
              props.itemType === ItemType.FOUND
                ? MAX_ITEM_POST_RANGE
                : MAX_NON_PREMIUM_ITEM_POST_RANGE
            }
            minimumTrackTintColor={COLORS.tertiary}
            maximumTrackTintColor={COLORS.grayLight}
            step={1}
            value={props.tar}
            onValueChange={handleTarSliderChange}
          />
        </View>
        <SubmitButton
          name="Save Position"
          handleFunction={handleSavePosition}
        />
      </View>
    </View>
  );
}