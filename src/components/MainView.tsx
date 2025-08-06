import React, { memo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/utils/Colors";

type PropTypes = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const MainView = ({ style: styles, children }: PropTypes) => {
  return (
    <SafeAreaView style={[style.container, styles]}>{children}</SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default memo(MainView);
