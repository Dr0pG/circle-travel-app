import React, { memo, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Exclusive, { ExclusivePackageList } from "@/api/Exclusive";

import AnimatedView from "@/components/AnimatedView";
import Locations from "@/components/Home/ExclusivePackages/Locations";
import Packages from "@/components/Home/ExclusivePackages/Packages";
import MainText from "@/components/MainText";

import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

const ExclusivePackages = () => {
  const cardListRef = useRef<FlatList>(null);
  const locationListRef = useRef<FlatList>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [currentExclusivePackages, setCurrentExclusivePackages] =
    useState<ExclusivePackageList | null>(null);

  useEffect(() => {
    const getExclusivePackages = async () => {
      setIsLoading(true);
      try {
        const exclusivePackages = await Exclusive.getExclusivePackages();
        setCurrentExclusivePackages(exclusivePackages);
      } catch (error: any) {
        console.log("Getting Exclusive Packages error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getExclusivePackages();
  }, []);

  const scrollToLocation = (location: string) => {
    if (
      !currentExclusivePackages?.packages &&
      !currentExclusivePackages?.locations
    )
      return;

    const locationIndex = currentExclusivePackages.packages.findIndex(
      (p) => p.location === location
    );

    if (locationIndex !== -1 && locationListRef.current)
      locationListRef.current?.scrollToIndex({
        index: locationIndex,
        animated: true,
        viewPosition: 0.5,
      });

    const index = currentExclusivePackages.packages.findIndex(
      (p) => p.location === location
    );

    if (index !== -1 && cardListRef.current) {
      cardListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  if (isLoading || !currentExclusivePackages) return;

  return (
    <AnimatedView duration={250} delay={100}>
      <View style={styles.container}>
        <MainText fontSize={Metrics.fontSize.large} fontWeight={"600"}>
          {i18n.t("home.exclusive_package")}
        </MainText>
      </View>
      <Locations
        ref={locationListRef}
        data={currentExclusivePackages.locations}
        selectedLocation={selectedLocation}
        onScrollToLocation={scrollToLocation}
      />

      <Packages
        ref={cardListRef}
        locationListRef={locationListRef}
        data={currentExclusivePackages.packages}
        locations={currentExclusivePackages.locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.padding.medium,
  },
});

export default memo(ExclusivePackages);
