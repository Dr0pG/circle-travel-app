import { StyleSheet } from "react-native";

import MainText from "@/components/MainText";
import MainView from "@/components/MainView";

const Favorite = () => {
  return (
    <MainView style={styles.container}>
      <MainText>Favorite</MainText>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Favorite;
