import React, { memo } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { goBack } from "@/navigation/NavigationService";

import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

const Back = () => {
  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons
        name="arrow-back-outline"
        size={Metrics.backButton}
        color={Colors.text}
      />
    </TouchableOpacity>
  );
};

export default memo(Back);
