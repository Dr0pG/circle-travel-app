import MainText from "@/components/MainText";
import { StyleSheet, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <MainText>Home Screen</MainText>
      <MainText>Open up 'src/App.tsx' to start working on your app!</MainText>
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

export default Home;
