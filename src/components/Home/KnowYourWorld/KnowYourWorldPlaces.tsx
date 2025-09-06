import React, { memo } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useTranslator } from "react-native-translator";

import { Image } from "expo-image";

import { KnowYourWorldItem } from "@/api/KnowWorld";

import MainText from "@/components/MainText";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { chunkArray } from "@/utils/Helper";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  data?: KnowYourWorldItem[];
  containerStyle?: StyleProp<ViewStyle>;
};

const KnowYourWorldPlaces = ({ data, containerStyle }: PropTypes) => {
  const { translate } = useTranslator();

  // Prepare data for 2 rows per column
  const columns = data ? chunkArray(data, 2) : [];

  const renderItem = async (item: KnowYourWorldItem, idx: number) => {
    // const descriptionTranslated = await translate(
    //   "en",
    //   currentLanguage,
    //   item.description || ""
    // );
    // console.log(
    //   "🚀 ~ renderColumn ~ descriptionTranslated:",
    //   descriptionTranslated
    // );

    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => console.log("item: ", item)}
        style={[idx === 1 ? { marginTop: Metrics.padding.medium } : undefined]}
      >
        <View style={styles.cardContentContainer}>
          <Image source={item.image} style={styles.image} contentFit="cover" />
          <View>
            <MainText fontWeight={"600"}>{item.name}</MainText>
            {item.description && (
              <MainText
                fontSize={Metrics.fontSize.medium}
                color={Colors.secondaryDark}
                style={styles.description}
              >
                {item.description}
              </MainText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Each item is now an array of up to 2 KnowYourWorldItem
  const renderColumn = ({
    item: columnItems,
  }: {
    item: KnowYourWorldItem[];
  }) => {
    return (
      <View style={styles.cardContainer}>{columnItems.map(renderItem)}</View>
    );
  };

  return (
    <FlatList
      data={columns}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, idx) => item.map((i) => i.name).join("-") + idx}
      contentContainerStyle={[
        containerStyle,
        {
          paddingTop: Metrics.padding.medium,
        },
      ]}
      renderItem={renderColumn}
      ItemSeparatorComponent={() => (
        <View style={{ width: Metrics.padding.medium }} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Metrics.recommended.cardWidth,
    flexDirection: "column",
  },
  cardContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: Metrics.knowYourWorld.imageSize,
    height: Metrics.knowYourWorld.imageSize,
    borderRadius: Metrics.borderRadius.large,
    marginRight: Metrics.padding.small,
  },
  description: {
    marginTop: Metrics.padding.small / 2,
    flexShrink: 1,
  },
});

export default memo(KnowYourWorldPlaces);
