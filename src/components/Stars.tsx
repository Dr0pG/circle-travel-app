import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = {
  rating: number;
  max?: number;
  size?: number;
  color?: string;
};
const Stars = ({
  rating,
  max = 5,
  size = 10,
  color = Colors.white,
}: PropTypes) => {
  return (
    <View style={styles.container}>
      {[...Array(max)].map((_, i) => {
        const filled = Math.min(Math.max(rating - i, 0), 1);
        return (
          <View key={i} style={styles.starContainer}>
            <Ionicons
              name="star-outline"
              size={size}
              color={color}
              style={styles.icon}
            />
            {filled > 0 && (
              <View
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  width: size * filled,
                  height: size,
                }}
              >
                <Ionicons name="star" size={size} color={color} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  starContainer: { position: "relative" },
  icon: { marginRight: Metrics.padding.small / 2 },
});

export default memo(Stars);
