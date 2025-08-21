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
  delay?: number;
} & AnimatedProps<ViewStyle>;

const AnimatedView = ({
  duration = 500,
  delay = 0,
  children,
  style,
  ...rest
}: PropTypes) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(duration).delay(delay).easing(Easing.ease)}
      exiting={FadeOutDown.duration(duration).delay(delay).easing(Easing.ease)}
      layout={LinearTransition}
      style={style}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export default memo(AnimatedView);
