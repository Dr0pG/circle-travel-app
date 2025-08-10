import { useState } from "react";
import { StyleSheet, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { navigate } from "@/navigation/NavigationService";

import { userStore } from "@/store/userStore";

import { ScreenName } from "@/types/navigation";

import AnimatedView from "@/components/AnimatedView";
import ExclusivePackages from "@/components/Home/ExclusivePackages/ExclusivePackages";
import TravelCategory from "@/components/Home/TravelCategory";
import KeyboardAware from "@/components/KeyboardAware";
import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import Input from "@/components/TextInput";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { getGreeting } from "@/utils/Helper";
import { Metrics } from "@/utils/Metrics";

import i18n from "@/i18n";

const onNavigateToInbox = () => navigate(ScreenName.Inbox);

const Home = () => {
  const { user: currentUser } = userStore();

  const [search, setSearch] = useState("");

  const renderHeaderContent = () => {
    const currentGreeting = getGreeting();
    return (
      <AnimatedView duration={250} style={styles.headerContainer}>
        <View style={styles.inboxIconContent}>
          <TouchableOpacity onPress={onNavigateToInbox}>
            <MaterialCommunityIcons
              name="bell"
              size={Metrics.headerIconSize}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.introContent}>
          <MainText fontSize={Metrics.fontSize.large} color={Colors.secondary}>
            {`${currentGreeting},`}
          </MainText>
          {currentUser && (
            <MainText fontSize={Metrics.fontSize.xLarge} fontWeight={"bold"}>
              {currentUser.displayName}
            </MainText>
          )}
        </View>
        <View>
          <MainText fontSize={Metrics.fontSize.xLarge} fontWeight={"bold"}>
            {i18n.t("home.explore_the_world")}
          </MainText>
          <Input
            placeholder={`${i18n.t("home.where_are_you_going")}`}
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            icon="search"
            onChangeText={setSearch}
            value={search}
            style={styles.searchInput}
          />
        </View>
      </AnimatedView>
    );
  };

  return (
    <MainView edges={["top"]}>
      <KeyboardAware
        style={styles.formContainer}
        contentContainerStyle={styles.formContentContainer}
      >
        {renderHeaderContent()}
        <ExclusivePackages />
        <View style={styles.travelCategoryContainer}>
          <TravelCategory />
        </View>
      </KeyboardAware>
    </MainView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  formContentContainer: {
    flexGrow: 1,
    paddingBottom: Metrics.padding.large,
  },
  headerContainer: {
    paddingHorizontal: Metrics.padding.medium,
    paddingTop: Metrics.padding.large,
    paddingBottom: Metrics.padding.small,
  },
  inboxIconContent: {
    alignItems: "flex-end",
  },
  introContent: {
    paddingVertical: Metrics.padding.small,
  },
  searchInput: {
    marginTop: Metrics.padding.small,
  },
  travelCategoryContainer: {
    paddingVertical: Metrics.padding.medium,
  },
});

export default Home;
