import React from "react";
import { FlatList, FlatListProps } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  FlatListPropsWithLayout,
} from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as typeof FlatList;

function AnimatedFlatListWrapper<ItemT>(
  props: FlatListProps<ItemT> & FlatListPropsWithLayout<ItemT>
) {
  return (
    <AnimatedFlatList<ItemT>
      entering={FadeIn.duration(250)}
      exiting={FadeOut.duration(250)}
      {...props}
    />
  );
}

export default AnimatedFlatListWrapper;
