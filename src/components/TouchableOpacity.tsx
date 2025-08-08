import { Metrics } from "@/utils/Metrics";
import React, { memo } from "react";
import {
  TouchableOpacity as RNTouchableOpacity,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { PressableProps } from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PropTypes = TouchableOpacityProps & {
  useGestureHandler?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const TouchableOpacity = ({
  useGestureHandler = false,
  style,
  children,
  ...rest
}: PropTypes) => {
  if (!useGestureHandler) {
    return (
      <RNTouchableOpacity
        activeOpacity={0.8}
        style={style}
        hitSlop={Metrics.hitSlop}
        {...rest}
      >
        {children}
      </RNTouchableOpacity>
    );
  }

  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    opacity.value = withTiming(0.5, { duration: 100 });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: 150 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={Metrics.hitSlop}
      {...(rest as PressableProps)}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
};

export default memo(TouchableOpacity);
