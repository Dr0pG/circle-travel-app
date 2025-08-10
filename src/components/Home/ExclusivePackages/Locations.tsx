import React, { forwardRef, memo } from "react";
import { FlatList, StyleSheet } from "react-native";

import MainText from "@/components/MainText";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  data: string[];
  selectedLocation: string | null;
  onScrollToLocation: (item: string) => void;
};

const Locations = forwardRef<FlatList<string>, PropTypes>(
  ({ data, selectedLocation, onScrollToLocation }, ref) => {
    const renderItem = ({ item }: { item: string }) => {
      return (
        <TouchableOpacity
          style={[styles.tab, selectedLocation === item && styles.activeTab]}
          onPress={() => onScrollToLocation(item)}
        >
          <MainText
            color={selectedLocation === item ? Colors.white : Colors.text}
          >
            {item}
          </MainText>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        ref={ref}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: Metrics.padding.medium }}
        renderItem={renderItem}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Metrics.padding.medium,
    paddingBottom: Metrics.padding.large,
  },
  tab: {
    paddingVertical: Metrics.padding.small / 2,
    paddingHorizontal: Metrics.padding.medium,
    marginRight: Metrics.padding.small,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
});

export default memo(Locations);
