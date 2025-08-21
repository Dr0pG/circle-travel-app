import React, { memo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";
import MainText from "./MainText";
import TouchableOpacity from "./TouchableOpacity";

type PropTypes = {
  tabs: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
};

const SwitchTabs = ({ tabs, activeTab, setActiveTab }: PropTypes) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const indicatorPosition = useSharedValue(0);

  const tabWidth = containerWidth > 0 ? containerWidth / tabs.length : 0;

  const handlePress = (index: number) => {
    setActiveTab(index);
    indicatorPosition.value = withTiming(index * tabWidth, { duration: 300 });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return (
    <View onLayout={onLayout}>
      <View style={[styles.container, { width: "100%" }]}>
        <View style={styles.background} />

        <Animated.View
          style={[
            styles.indicator,
            { width: tabWidth },
            animatedIndicatorStyle,
          ]}
        />

        <View style={styles.row}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => handlePress(index)}
            >
              <MainText
                color={activeTab === index ? Colors.white : Colors.primary}
              >
                {tab}
              </MainText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.switchTabHeight,
    borderRadius: Metrics.borderRadius.xLarge,
    backgroundColor: Colors.secondary,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.secondary,
  },
  indicator: {
    position: "absolute",
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: Metrics.borderRadius.xLarge,
  },
});

export default memo(SwitchTabs);
