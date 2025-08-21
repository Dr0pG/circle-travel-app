import React, { forwardRef, memo, RefObject, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import AntDesign from "@expo/vector-icons/AntDesign";

import { ExclusivePackage } from "@/api/Exclusive";

import MainText from "@/components/MainText";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

const CARD_WIDTH = Metrics.screenWidth - Metrics.padding.large * 4;

type PropTypes = {
  data: ExclusivePackage[];
  locations: string[];
  locationListRef: RefObject<FlatList<any>>;
  selectedLocation: string | null;
  setSelectedLocation: (location: string) => void;
};

const Packages = forwardRef<FlatList<ExclusivePackage>, PropTypes>(
  (
    { data, locations, locationListRef, selectedLocation, setSelectedLocation },
    ref
  ) => {
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const firstVisible = viewableItems[0].item.location;
        if (firstVisible !== selectedLocation) {
          setSelectedLocation(firstVisible);

          const locIndex = locations.findIndex(
            (loc: string) =>
              loc.trim().toLowerCase() === firstVisible.trim().toLowerCase()
          );
          locationListRef?.current?.scrollToIndex({
            index: locIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }
    }).current;

    return (
      <FlatList
        ref={ref}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: Metrics.padding.medium }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.infoContainer}>
              <View style={styles.nameContent}>
                <MainText numberOfLines={1} fontWeight={"bold"}>
                  {item.name}
                </MainText>
                <MainText
                  fontSize={Metrics.fontSize.medium}
                  color={Colors.secondary}
                >
                  {item.location}
                </MainText>
              </View>
              <View style={styles.ratingContainer}>
                <AntDesign
                  name="star"
                  size={Metrics.ratingIconSize}
                  color={Colors.yellow}
                  style={styles.ratingIcon}
                />
                <MainText color={Colors.yellow}>{item.rating}</MainText>
              </View>
            </View>
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + Metrics.padding.large,
          offset: (CARD_WIDTH + Metrics.padding.large) * index,
          index,
        })}
      />
    );
  }
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: Metrics.padding.large,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: Colors.white,
    marginBottom: Metrics.padding.medium,
    ...Metrics.shadow,
  },
  cardImage: {
    width: "100%",
    height: Metrics.exclusivePackageImageHeight,
    borderRadius: Metrics.borderRadius.large,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Metrics.padding.medium,
  },
  nameContent: {
    width: "75%",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingIcon: {
    marginRight: Metrics.padding.small / 2,
  },
});

export default memo(Packages);
