import { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { Image } from "expo-image";

import { navigate } from "@/navigation/NavigationService";

import AnimatedView from "@/components/AnimatedView";
import Button from "@/components/Button";
import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import Input from "@/components/TextInput";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

import { ScreenName } from "@/types/navigation";

import slide1 from "@/assets/onBoarding/slide1.png";

import i18n from "@/i18n";

const onNavigateToSignUp = () => navigate(ScreenName.SignUp);

const SignIn = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [generalError, setGeneralError] = useState<string | null>();
  const [error, serError] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    Keyboard.dismiss();

    setGeneralError(null);
  };

  const onForgotPassword = () => {
    console.log("Forgot password");
  };

  const renderTitle = () => {
    return (
      <MainText
        fontSize={Metrics.fontSize.xLarge}
        fontWeight={"bold"}
        textAlign="center"
        style={styles.title}
      >
        {i18n.t("sign_in.title")}
      </MainText>
    );
  };

  const renderForm = () => {
    return (
      <>
        <Input
          ref={emailInputRef}
          placeholder={`${i18n.t("sign_in.your_email")}`}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(email: string) => setEmail(email.toLowerCase())}
          value={email}
          hasError={error.email !== ""}
          errorMessage={error.email}
          onFocus={() => serError({ ...error, email: "" })}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          icon="password"
          placeholder={i18n.t("sign_in.your_password")}
          secureTextEntry
          returnKeyType="send"
          value={password}
          onChangeText={setPassword}
          hasError={error.password !== ""}
          errorMessage={error.password}
          onFocus={() => serError({ ...error, password: "" })}
          onSubmitEditing={onSubmit}
        />
      </>
    );
  };

  const renderButton = () => {
    return (
      <Button onPress={() => console.log("Sign in")}>
        {i18n.t("sign_in.sign_in")}
      </Button>
    );
  };

  const renderBottomInfo = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onForgotPassword}>
          <MainText textAlign="center">
            {i18n.t("sign_in.forgot_password")}
          </MainText>
        </TouchableOpacity>
        <View style={styles.noAccountContainer}>
          <MainText textAlign="center">
            {i18n.t("sign_in.dont_have_an_account")}
            <TouchableWithoutFeedback onPress={onNavigateToSignUp}>
              <MainText
                textAlign="center"
                fontWeight={"bold"}
                color={Colors.primary}
              >
                {` ${i18n.t("sign_in.sign_up")}`}
              </MainText>
            </TouchableWithoutFeedback>
          </MainText>
        </View>
      </View>
    );
  };

  return (
    <MainView>
      <AnimatedView style={styles.contentContainer}>
        <KeyboardAwareScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.formContentContainer}
          keyboardDismissMode="interactive"
        >
          <Image source={slide1} style={styles.image} contentFit="contain" />
          {renderTitle()}
          {renderForm()}
          {renderButton()}
          {renderBottomInfo()}
        </KeyboardAwareScrollView>
      </AnimatedView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Metrics.padding.large,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Metrics.padding.large,
  },
  image: {
    width: "100%",
    height: Metrics.imageHeight,
  },
  title: {
    paddingVertical: Metrics.padding.medium * 2,
  },
  formContainer: {
    width: "100%",
  },
  formContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bottomContainer: {
    paddingTop: Metrics.padding.large,
  },
  noAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Metrics.padding.large,
  },
});

export default SignIn;
