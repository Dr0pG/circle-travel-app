import React, { memo, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import Category from "@/api/Category";

import MainText from "@/components/MainText";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Metrics } from "@/utils/Metrics";

import { Colors } from "@/utils/Colors";
import { getCategorySource, TravelCategoryType } from "@/utils/Helper";

import i18n from "@/i18n";

const TravelCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<string[] | null>([]);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const currentCategories = await Category.getCategories();
        setCategories(currentCategories);
      } catch (error: any) {
        console.log("Getting Categories error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  if (isLoading || !categories?.length) return;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => console.log("item: ", item)}>
        <View style={styles.cardContainer}>
          <Image
            source={getCategorySource(item as TravelCategoryType)}
            style={styles.image}
            contentFit="contain"
          />
          <MainText>{i18n.t(`category.${item}`)}</MainText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <MainText fontSize={Metrics.fontSize.large} fontWeight={"600"}>
          {i18n.t("home.explore_category")}
        </MainText>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        style={styles.container}
        contentContainerStyle={{ paddingTop: Metrics.padding.medium }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.padding.medium,
  },
  cardContainer: {
    width: Metrics.category.cardWidth,
    height: Metrics.category.cardHeight,
    borderWidth: 1,
    borderColor: Colors.secondary,
    padding: Metrics.padding.medium,
    marginRight: Metrics.padding.medium,
    borderRadius: Metrics.borderRadius.large * 2,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: Metrics.category.imageSize,
    height: Metrics.category.imageSize,
    borderRadius: Metrics.borderRadius.large,
  },
});

export default memo(TravelCategory);
