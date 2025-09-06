import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ImageBackground } from "expo-image";

import Ionicons from "@expo/vector-icons/Ionicons";

import { RecommendedPackage } from "@/api/Recommended";

import AnimatedFlatListWrapper from "@/components/AnimatedFlatListWrapper";
import MainText from "@/components/MainText";
import Stars from "@/components/Stars";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  data?: RecommendedPackage[];
};

const Recommendations = ({ data }: PropTypes) => {
  const fade = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Slide out to the left and fade out
    fade.value = withTiming(0, { duration: 150 });
    translateX.value = withTiming(-30, { duration: 150 }, (finished) => {
      if (finished) {
        // Slide in from the right and fade in
        translateX.value = 30;
        fade.value = 0;
        fade.value = withTiming(1, { duration: 200 });
        translateX.value = withTiming(0, { duration: 200 });
      }
    });
  }, [data]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateX: translateX.value }],
  }));

  const renderItem = ({ item }: { item: RecommendedPackage }) => {
    return (
      <ImageBackground
        source={item.image}
        contentFit="cover"
        style={styles.image}
        imageStyle={{ borderRadius: Metrics.borderRadius.xLarge }}
      >
        <View style={styles.infoContainer}>
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
        </View>
      </ImageBackground>
    );
  };

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <AnimatedFlatListWrapper
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
    </Animated.View>
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
  },
  locationContainer: {
    paddingBottom: Metrics.padding.small / 2,
    paddingRight: Metrics.padding.small / 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blackTransparent,
    padding: Metrics.padding.medium,
    borderBottomLeftRadius: Metrics.borderRadius.xLarge,
    borderBottomRightRadius: Metrics.borderRadius.xLarge,
  },
});

export default memo(Recommendations);
