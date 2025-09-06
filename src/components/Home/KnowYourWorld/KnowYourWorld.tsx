import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import AnimatedView from "@/components/AnimatedView";
import MainText from "@/components/MainText";

import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";
import { Colors } from "@/utils/Colors";

const KnowYourWorld = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [knowledgePlaces, setKnowledgePlaces] = useState(null);

  useEffect(() => {
    const getKnowledgePlaces = async () => {
      setIsLoading(true);
      try {
        // const recommendedPackages = await Recommended.getRecommendedPackages();
        // setCurrentRecommendedPackages(recommendedPackages);
      } catch (error: any) {
        console.log("Getting Knowledge Places error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getKnowledgePlaces();
  }, []);

  if (isLoading) return;
  //   if (!knowledgePlaces) return;

  return (
    <AnimatedView style={styles.container} duration={250} delay={400}>
      <View style={styles.contentContainer}>
        <MainText fontSize={Metrics.fontSize.large} fontWeight={"600"}>
          {i18n.t("know_your_world.title")}
        </MainText>
        <MainText color={Colors.secondaryDark}>
          {i18n.t("know_your_world.description")}
        </MainText>
      </View>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Metrics.padding.regular,
  },
  contentContainer: {
    paddingHorizontal: Metrics.padding.medium,
  },
});

export default memo(KnowYourWorld);
