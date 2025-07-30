import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  inActiveDotColor?: string;
  activeDotColor?: string;

  inActiveDotOpacity?: number;
  expandingDotWidth?: number;

  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;

  data: Array<Object>;
  scrollX: SharedValue<number>;
};

const ExpandingDots = ({
  scrollX,
  data,
  dotStyle = {},
  containerStyle = {},
  inActiveDotOpacity = 0.5,
  inActiveDotColor = Colors.secondary,
  expandingDotWidth = Metrics.onboarding.dotExpandedSize,
  activeDotColor = Colors.primary,
}: PropTypes) => {
  const dotWidth = (dotStyle.width as number) || Metrics.onboarding.dotSize;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * Metrics.screenWidth,
            index * Metrics.screenWidth,
            (index + 1) * Metrics.screenWidth,
          ];

          return {
            width: interpolate(
              scrollX.value,
              inputRange,
              [dotWidth, expandingDotWidth, dotWidth],
              Extrapolation.CLAMP
            ),
            opacity: interpolate(
              scrollX.value,
              inputRange,
              [inActiveDotOpacity, 1, inActiveDotOpacity],
              Extrapolation.CLAMP
            ),
            backgroundColor: interpolateColor(scrollX.value, inputRange, [
              inActiveDotColor,
              activeDotColor,
              inActiveDotColor,
            ]),
          };
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[Metrics.onboarding.dot, dotStyle, animatedStyle]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: Metrics.padding.small,
  },
});

export default ExpandingDots;
