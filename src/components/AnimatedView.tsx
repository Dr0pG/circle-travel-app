import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  AnimatedProps,
  Easing,
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

type PropTypes = AnimatedProps<{
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}>;

const AnimatedView = ({ children, style, ...rest }: PropTypes) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).easing(Easing.ease)}
      exiting={FadeOutDown.duration(500).easing(Easing.ease)}
      layout={LinearTransition}
      style={style}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export default memo(AnimatedView);
