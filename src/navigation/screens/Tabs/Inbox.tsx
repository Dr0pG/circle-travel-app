import { StyleSheet } from "react-native";

import MainText from "@/components/MainText";
import MainView from "@/components/MainView";

const Inbox = () => {
  return (
    <MainView style={styles.container}>
      <MainText>Inbox</MainText>
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

export default Inbox;
