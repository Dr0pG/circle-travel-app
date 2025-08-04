import * as React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Assets as NavigationAssets } from "@react-navigation/elements";

import { Asset } from "expo-asset";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationRef } from "@/navigation/NavigationService";
import Home from "@/navigation/screens/Home";
import OnBoardingScreen from "@/navigation/screens/OnBoarding";

import { useAppStore } from "@/store/useAppStore";

import bell from "@/assets/bell.png";
import newspaper from "@/assets/newspaper.png";
import slide1 from "@/assets/onBoarding/slide1.png";
import slide2 from "@/assets/onBoarding/slide2.png";
import slide3 from "@/assets/onBoarding/slide3.png";

Asset.loadAsync([...NavigationAssets, newspaper, bell, slide1, slide2, slide3]);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={newspaper}
              tintColor={color}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function App() {
  const { isOnboardingSeen } = useAppStore();

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => SplashScreen.hideAsync()}
      >
        <Stack.Navigator
          initialRouteName={isOnboardingSeen ? "HomeTabs" : "OnBoarding"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
