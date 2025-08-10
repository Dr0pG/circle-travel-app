import React, { memo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Edges, SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/utils/Colors";

type PropTypes = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  edges?: Edges;
};

const MainView = ({ style: styles, children, edges }: PropTypes) => {
  return (
    <SafeAreaView edges={edges} style={[style.container, styles]}>
      {children}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default memo(MainView);
