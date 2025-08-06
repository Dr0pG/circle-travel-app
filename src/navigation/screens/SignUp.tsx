import { StyleSheet, View } from "react-native";

import MainText from "@/components/MainText";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <MainText>SignUp</MainText>
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

export default SignUp;
