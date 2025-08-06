import { StyleSheet, View } from "react-native";

import MainText from "@/components/MainText";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <MainText>404</MainText>
      {/* <Button screen="HomeTabs">Go to Home</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotFound;
