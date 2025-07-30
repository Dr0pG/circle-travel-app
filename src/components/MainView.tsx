import React from "react";
import { StyleSheet } from "react-native";

import { Colors } from "@/utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

type PropTypes = {
  children: React.ReactNode;
};

const MainView = ({ children }: PropTypes) => {
  return <SafeAreaView style={style.container}>{children}</SafeAreaView>;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default MainView;
