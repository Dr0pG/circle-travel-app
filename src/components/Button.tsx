import React, { memo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";

import MainText from "@/components/MainText";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  variant?: "primary" | "outline";
};

const Button = ({
  children,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  variant = "primary",
}: PropTypes) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        disabled && styles.disabled,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : Colors.white} />
      ) : (
        <Animated.View
          key={children?.toString()}
          entering={FadeIn.easing(Easing.ease)}
        >
          <MainText
            fontWeight="bold"
            color={isOutline ? Colors.primary : Colors.white}
          >
            {children}
          </MainText>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: Metrics.padding.medium,
    paddingHorizontal: Metrics.padding.large,
    borderRadius: Metrics.borderRadius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default memo(Button);
