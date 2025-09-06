import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { I18nextProvider } from "react-i18next";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { KeyboardProvider } from "react-native-keyboard-controller";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Assets as NavigationAssets } from "@react-navigation/elements";

import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";

import { TranslatorProvider } from "react-native-translator";

import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Toasts } from "@backpackapp-io/react-native-toast";
import LottieView from "lottie-react-native";

import { navigationRef, replace } from "@/navigation/NavigationService";
import ForgotPassword from "@/navigation/screens/ForgotPassword";
import NotFound from "@/navigation/screens/NotFound";
import OnBoardingScreen from "@/navigation/screens/OnBoarding";
import SignIn from "@/navigation/screens/SignIn";
import SignUp from "@/navigation/screens/SignUp";
import Favorite from "@/navigation/screens/Tabs/Favorite";
import Home from "@/navigation/screens/Tabs/Home";
import Inbox from "@/navigation/screens/Tabs/Inbox";
import More from "@/navigation/screens/Tabs/More";

import CustomTabBar from "@/components/CustomTabBar";
import MainView from "@/components/MainView";

import { ScreenName } from "@/types/navigation";

import { useAppStore } from "@/store/useAppStore";
import { userStore } from "@/store/userStore";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

import bell from "@/assets/bell.png";
import beach from "@/assets/category/beach.jpg";
import desert from "@/assets/category/desert.jpg";
import forest from "@/assets/category/forest.jpg";
import jungle from "@/assets/category/jungle.jpg";
import lake from "@/assets/category/lake.jpg";
import mountain from "@/assets/category/mountain.jpg";
import river from "@/assets/category/river.jpg";
import volcano from "@/assets/category/volcano.jpg";
import login from "@/assets/login.png";
import bigLoading from "@/assets/lottie/bigLoading.json";
import newspaper from "@/assets/newspaper.png";
import slide1 from "@/assets/onBoarding/slide1.png";
import slide2 from "@/assets/onBoarding/slide2.png";
import slide3 from "@/assets/onBoarding/slide3.png";
import register from "@/assets/register.png";

import i18n from "@/i18n";

Asset.loadAsync([
  ...NavigationAssets,
  newspaper,
  bell,
  slide1,
  slide2,
  slide3,
  login,
  register,
  mountain,
  beach,
  desert,
  forest,
  lake,
  river,
  jungle,
  volcano,
]);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="email" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const ThemedApp = () => {
  const { isOnboardingSeen } = useAppStore();
  const { user: currentUser, storeUser } = userStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(
      getAuth(),
      (user: FirebaseAuthTypes.User | null) => {
        storeUser(user);

        setIsLoading(false);

        if (user) replace(ScreenName.HomeTabs);
        else replace(ScreenName.SignIn);
      }
    );
    return subscriber;
  }, []);

  if (isLoading) {
    return (
      <MainView style={styles.loadingContainer}>
        <LottieView
          source={bigLoading}
          style={styles.loading}
          autoPlay
          loop
          speed={3}
        />
      </MainView>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={
          isOnboardingSeen
            ? currentUser
              ? ScreenName.HomeTabs
              : ScreenName.SignIn
            : ScreenName.OnBoarding
        }
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return (
      <MainView style={styles.loadingContainer}>
        <LottieView
          source={bigLoading}
          style={styles.loading}
          autoPlay
          loop
          speed={3}
        />
      </MainView>
    );
  }

  return (
    <TranslatorProvider>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <GestureHandlerRootView style={styles.container}>
              <ThemedApp />
              <Toasts
                overrideDarkMode
                defaultStyle={{
                  text: {
                    color: Colors.text,
                  },
                }}
              />
            </GestureHandlerRootView>
          </KeyboardProvider>
        </SafeAreaProvider>
      </I18nextProvider>
    </TranslatorProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
  },
});
