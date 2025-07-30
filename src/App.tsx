import * as React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

import { Navigation } from "@/navigation";

Asset.loadAsync([
  ...NavigationAssets,
  require("@/assets/newspaper.png"),
  require("@/assets/bell.png"),
  require("@/assets/onBoarding/slide1.png"),
  require("@/assets/onBoarding/slide2.png"),
  require("@/assets/onBoarding/slide3.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigation
        theme={theme}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
