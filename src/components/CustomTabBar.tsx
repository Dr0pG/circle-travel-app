import { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import MainText from "@/components/MainText";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const tabWidth = Metrics.screenWidth / state.routes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  const indicatorWidth = tabWidth / 2;

  useEffect(() => {
    translateX.value = withTiming(
      state.index * tabWidth + (tabWidth - indicatorWidth) / 2,
      { duration: 250 }
    );
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.indicator, { width: indicatorWidth }, indicatorStyle]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const scale = useSharedValue(1);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? Colors.primary : Colors.secondary,
              size: Metrics.tabBarIconSize,
            })
          : null;

        const onPress = () => {
          scale.value = withTiming(1.2, { duration: 120 }, () => {
            scale.value = withTiming(1, { duration: 120 });
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Animated.View style={[animatedStyle, { alignItems: "center" }]}>
              {icon}
              <MainText
                color={isFocused ? Colors.primary : Colors.secondary}
                fontSize={Metrics.fontSize.medium}
              >
                {i18n.t(`tabs.${label.toString().toLowerCase()}`)}
              </MainText>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    height: Metrics.tabBarHeight,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: Metrics.borderRadius.medium,
    elevation: Metrics.borderRadius.medium,
    zIndex: 1,
  },
  indicator: {
    position: "absolute",
    top: 0,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: Metrics.borderRadius.small,
    zIndex: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Metrics.padding.small,
  },
});

export default memo(CustomTabBar);
