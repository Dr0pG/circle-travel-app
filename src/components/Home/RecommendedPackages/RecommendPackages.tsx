import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Recommended, { RecommendedPackageList } from "@/api/Recommended";

import AnimatedView from "@/components/AnimatedView";
import Recommendations from "@/components/Home/RecommendedPackages/Recommendations";
import Tabs from "@/components/Home/RecommendedPackages/Tabs";
import MainText from "@/components/MainText";

import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

const RecommendPackages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [currentRecommendedPackages, setCurrentRecommendedPackages] =
    useState<RecommendedPackageList | null>(null);

  useEffect(() => {
    const getRecommendationPackages = async () => {
      setIsLoading(true);
      try {
        const recommendedPackages = await Recommended.getRecommendedPackages();
        setCurrentRecommendedPackages(recommendedPackages);
      } catch (error: any) {
        console.log("Getting Exclusive Packages error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendationPackages();
  }, []);

  if (isLoading || !currentRecommendedPackages) return;

  const data =
    activeTab === 0
      ? currentRecommendedPackages?.solo
      : currentRecommendedPackages?.family;

  return (
    <AnimatedView duration={250} delay={300}>
      <View style={styles.container}>
        <MainText fontSize={Metrics.fontSize.large} fontWeight={"600"}>
          {i18n.t("home.recommended_packages")}
        </MainText>
        <View style={styles.tabsContainer}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      </View>
      <Recommendations data={data} />
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.padding.medium,
  },
  tabsContainer: {
    paddingVertical: Metrics.padding.medium,
  },
});

export default memo(RecommendPackages);
