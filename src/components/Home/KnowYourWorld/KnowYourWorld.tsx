import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import KnowWorld, { KnowYourWorldItem } from "@/api/KnowWorld";

import AnimatedView from "@/components/AnimatedView";
import KnowYourWorldPlaces from "@/components/Home/KnowYourWorld/KnowYourWorldPlaces";
import MainText from "@/components/MainText";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

const KnowYourWorld = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [knowledgePlaces, setKnowledgePlaces] = useState<
    KnowYourWorldItem[] | null
  >([]);

  useEffect(() => {
    const getKnowledgePlaces = async () => {
      setIsLoading(true);
      try {
        const currentKnowledgePlaces = await KnowWorld.getKnowYourWorld();
        setKnowledgePlaces(currentKnowledgePlaces);
      } catch (error: any) {
        console.log("Getting Knowledge Places error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getKnowledgePlaces();
  }, []);

  if (isLoading) return;
  if (!knowledgePlaces?.length) return;

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
      <KnowYourWorldPlaces
        data={knowledgePlaces}
        containerStyle={styles.contentContainer}
      />
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
