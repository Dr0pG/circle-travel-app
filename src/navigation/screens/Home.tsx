import { StyleSheet, View } from "react-native";

import Authentication from "@/api/Authentication";

import MainText from "@/components/MainText";
import TouchableOpacity from "@/components/TouchableOpacity";

const Home = () => {
  const onLogOut = () => Authentication.signOut();

  return (
    <View style={styles.container}>
      <MainText>Home Screen</MainText>
      <MainText>Open up 'src/App.tsx' to start working on your app!</MainText>
      <TouchableOpacity onPress={onLogOut}>
        <MainText>Log out</MainText>
      </TouchableOpacity>
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
