import React, { useRef, useState } from "react";
import { FlatList, ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { runOnJS } from "react-native-worklets";

import { Image } from "expo-image";

import Button from "@/components/Button";
import MainText from "@/components/MainText";
import ExpandingDots from "@/components/onBoarding/Dots";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

type Slide = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

type OnBoardingProps = {
  slides: Slide[];
};

const OnBoarding = ({ slides }: OnBoardingProps) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  useAnimatedReaction(
    () => Math.round(scrollX.value / Metrics.screenWidth),
    (currentIndex) => {
      if (currentIndex === slides.length - 1) runOnJS(setIsLastSlide)(true);
      else runOnJS(setIsLastSlide)(false);
    },
    [slides.length]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
  };

  const handleNext = () => {
    if (isLastSlide) return;
    flatListRef.current?.scrollToIndex({
      index: Math.round(scrollX.value / Metrics.screenWidth) + 1,
      animated: true,
    });
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width: Metrics.screenWidth }]}>
      {!!item.image && (
        <Image source={item.image} style={styles.image} contentFit="contain" />
      )}
      <MainText
        fontSize={Metrics.fontSize.large}
        fontWeight={"bold"}
        textAlign="center"
        style={styles.title}
      >
        {item.title}
      </MainText>
      <MainText textAlign="center" style={styles.subtitle}>
        {item.subtitle}
      </MainText>
    </View>
  );

  const renderButton = () => {
    return (
      <View style={styles.button}>
        <Button onPress={handleNext}>
          {isLastSlide ? i18n.t("get_started") : i18n.t("next")}
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isLastSlide && (
        <Animated.View
          entering={FadeIn.easing(Easing.ease)}
          exiting={FadeOut.easing(Easing.ease)}
          style={styles.skipButton}
        >
          <TouchableOpacity onPress={handleSkip}>
            <MainText fontWeight={"600"} color={Colors.primary}>
              {i18n.t("skip")}
            </MainText>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
      <ExpandingDots
        data={slides}
        scrollX={scrollX}
        containerStyle={styles.expandedDotsContainer}
      />
      {renderButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    padding: Metrics.padding.large * 2,
  },
  image: {
    width: "70%",
    height: "50%",
    marginBottom: Metrics.padding.small,
  },
  title: {
    marginBottom: Metrics.padding.large,
  },
  subtitle: {
    paddingHorizontal: Metrics.padding.small,
  },
  skipButton: {
    position: "absolute",
    top: Metrics.padding.large,
    right: Metrics.padding.large,
    zIndex: 10,
  },
  expandedDotsContainer: {
    position: "absolute",
    bottom: Metrics.screenHeight * 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: Metrics.padding.large,
  },
});

export default OnBoarding;
