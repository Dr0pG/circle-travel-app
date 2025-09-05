import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ImageBackground } from "expo-image";

import Ionicons from "@expo/vector-icons/Ionicons";

import { RecommendedPackage } from "@/api/Recommended";

import MainText from "@/components/MainText";
import Stars from "@/components/Stars";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  data?: RecommendedPackage[];
};

const Recommendations = ({ data }: PropTypes) => {
  const renderItem = ({ item }: { item: RecommendedPackage }) => {
    return (
      <ImageBackground
        source={item.image}
        contentFit="cover"
        style={styles.image}
        imageStyle={{ borderRadius: Metrics.borderRadius.xLarge }}
      >
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-sharp"
            size={Metrics.recommended.locationIconSize}
            color={Colors.white}
          />
        </View>
        <View>
          <MainText
            fontSize={Metrics.fontSize.medium}
            fontWeight={"600"}
            color={Colors.white}
          >
            {item.name}
          </MainText>
          <Stars rating={item.rating} />
        </View>
      </ImageBackground>
    );
  };

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ width: Metrics.padding.medium }} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.padding.medium,
  },
  image: {
    width: Metrics.recommended.cardWidth,
    height: Metrics.recommended.cardHeight,
    flexDirection: "row",
    alignItems: "flex-end",
    padding: Metrics.padding.medium,
  },
  locationContainer: {
    paddingBottom: Metrics.padding.small / 2,
    paddingRight: Metrics.padding.small / 2,
  },
});

export default memo(Recommendations);
