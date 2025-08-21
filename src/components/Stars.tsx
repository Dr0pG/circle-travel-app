import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/utils/Colors";

type PropTypes = {
  rating: number;
  max?: number;
  size?: number;
  color?: string;
};
const Stars = ({
  rating,
  max = 5,
  size = 14,
  color = Colors.white,
}: PropTypes) => {
  return (
    <View style={styles.container}>
      {[...Array(max)].map((_, i) => {
        const filled = Math.min(Math.max(rating - i, 0), 1);
        return (
          <View key={i} style={styles.starContainer}>
            <Ionicons name="star-outline" size={size} color={color} />
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
});

export default memo(Stars);
