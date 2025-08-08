import { useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";

import { Image } from "expo-image";

import { navigate } from "@/navigation/NavigationService";

import Authentication from "@/api/Authentication";

import AnimatedView from "@/components/AnimatedView";
import Button from "@/components/Button";
import KeyboardAware from "@/components/KeyboardAware";
import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import Input from "@/components/TextInput";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";
import Validations, { SignInForm } from "@/utils/Validations";

import { ScreenName } from "@/types/navigation";

import login from "@/assets/login.png";

import i18n from "@/i18n";

const onForgotPassword = () => navigate(ScreenName.ForgotPassword);
const onNavigateToSignUp = () => navigate(ScreenName.SignUp);

const SignIn = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, serError] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState<string | null>();

  const isFormFilled = !!email.trim() && !!password.trim();

  const onSubmit = async () => {
    Keyboard.dismiss();

    setGeneralError(null);

    const validate = Validations.validateSignIn({ email, password });

    if (!validate.success) return serError(validate.errors ?? error);

    try {
      setIsLoading(true);
      await Authentication.loginUser(email, password);
      setGeneralError(null);
    } catch (error: any) {
      setGeneralError(error);
    } finally {
      setIsLoading(false);
    }
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
        {!!generalError && (
          <AnimatedView duration={100}>
            <MainText color={Colors.error} style={styles.generalError}>
              {generalError}
            </MainText>
          </AnimatedView>
        )}
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
          textContentType="oneTimeCode"
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          hasError={error.password !== ""}
          errorMessage={error.password}
          onFocus={() => serError({ ...error, password: "" })}
          {...(isFormFilled && {
            onSubmitEditing: onSubmit,
          })}
        />
      </>
    );
  };

  const renderButton = () => {
    return (
      <Button
        variant={isFormFilled ? "primary" : "outline"}
        isLoading={isLoading}
        disabled={!isFormFilled}
        onPress={onSubmit}
      >
        {i18n.t("sign_in.sign_in")}
      </Button>
    );
  };

  const renderBottomInfo = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity disabled={isLoading} onPress={onForgotPassword}>
          <MainText textAlign="center">
            {i18n.t("sign_in.forgot_password")}
          </MainText>
        </TouchableOpacity>
        <View style={styles.noAccountContainer}>
          <MainText textAlign="center">
            {i18n.t("sign_in.dont_have_an_account")}
          </MainText>
          <TouchableOpacity disabled={isLoading} onPress={onNavigateToSignUp}>
            <MainText
              textAlign="center"
              fontWeight={"bold"}
              color={Colors.primary}
            >
              {` ${i18n.t("sign_in.sign_up")}`}
            </MainText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <MainView>
      <AnimatedView style={styles.contentContainer}>
        <KeyboardAware
          style={styles.formContainer}
          contentContainerStyle={styles.formContentContainer}
        >
          <Image source={login} style={styles.image} contentFit="contain" />
          {renderTitle()}
          {renderForm()}
          {renderButton()}
          {renderBottomInfo()}
        </KeyboardAware>
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
    paddingHorizontal: Metrics.padding.large,
    paddingBottom: Metrics.padding.large,
    paddingTop: Metrics.padding.small,
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
  generalError: {
    paddingBottom: Metrics.padding.medium,
  },
});

export default SignIn;
