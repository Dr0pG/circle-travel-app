import { StyleSheet } from "react-native";

import Authentication from "@/api/Authentication";

import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import TouchableOpacity from "@/components/TouchableOpacity";

const Home = () => {
  const onLogOut = async () => await Authentication.signOut();

  return (
    <MainView style={styles.container}>
      <MainText>Home Screen</MainText>
      <TouchableOpacity onPress={onLogOut}>
        <MainText>Log out</MainText>
      </TouchableOpacity>
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

export default Home;
