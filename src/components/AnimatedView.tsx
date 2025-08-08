import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  AnimatedProps,
  Easing,
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

type PropTypes = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  duration?: number;
} & AnimatedProps<ViewStyle>;

const AnimatedView = ({
  duration = 500,
  children,
  style,
  ...rest
}: PropTypes) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(duration).easing(Easing.ease)}
      exiting={FadeOutDown.duration(duration).easing(Easing.ease)}
      layout={LinearTransition}
      style={style}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export default memo(AnimatedView);
