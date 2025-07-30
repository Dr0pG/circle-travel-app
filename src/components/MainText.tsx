import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = TextProps & {
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  textAlign?: TextStyle["textAlign"];
  style?: TextStyle;
};

const MainText = ({
  children,
  color,
  fontSize,
  fontWeight,
  textAlign,
  style,
  ...rest
}: PropTypes) => {
  return (
    <Text
      style={[
        styles.textStyle,
        {
          fontSize,
          lineHeight: fontSize
            ? fontSize * 1.3
            : Metrics.fontSize.regular * 1.3,
          color,
          fontWeight,
          textAlign,
        },
        style,
      ]}
      accessible
      accessibilityLabel={children?.toString()}
      accessibilityRole="text"
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Metrics.fontSize.regular,
    lineHeight: Metrics.fontSize.regular * 1.3,
    color: Colors.text,
    fontWeight: "400",
    textAlign: "left",
  },
});

export default MainText;
