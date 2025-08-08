import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

import { goBack } from "@/navigation/NavigationService";

import Authentication from "@/api/Authentication";

import AnimatedView from "@/components/AnimatedView";
import Back from "@/components/Back";
import Button from "@/components/Button";
import KeyboardAware from "@/components/KeyboardAware";
import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import Input from "@/components/TextInput";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";
import Validations from "@/utils/Validations";

import correct from "@/assets/lottie/correct.json";

import i18n from "@/i18n";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string | null>();

  const onSubmit = async () => {
    Keyboard.dismiss();

    setGeneralError(null);

    const validate = Validations.validateEmail(email);

    if (!validate.success) return setEmailError(validate.error ?? emailError);

    try {
      setIsLoading(true);
      await Authentication.resetPassword(email);
      setGeneralError(null);
      setIsEmailSent(true);
    } catch (error: any) {
      setGeneralError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSendButton = () => {
    return (
      <Button
        variant={!!email?.trim() ? "primary" : "outline"}
        isLoading={isLoading}
        disabled={!!!email?.trim()}
        onPress={onSubmit}
      >
        {i18n.t("reset_password.send_email")}
      </Button>
    );
  };

  const renderResetPasswordContent = () => {
    return (
      <KeyboardAware style={styles.formContainer}>
        <Back />
        <View style={styles.content}>
          <MainText
            textAlign="center"
            fontSize={Metrics.fontSize.xLarge}
            fontWeight={"bold"}
            style={styles.title}
          >
            {i18n.t("reset_password.title")}
          </MainText>
          <MainText textAlign="center">
            {i18n.t("reset_password.description")}
          </MainText>
          <View style={styles.input}>
            {!!generalError && (
              <AnimatedView duration={100}>
                <MainText color={Colors.error} style={styles.generalError}>
                  {generalError}
                </MainText>
              </AnimatedView>
            )}
            <Input
              placeholder={`${i18n.t("reset_password.your_email")}`}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(email: string) => setEmail(email.toLowerCase())}
              value={email}
              hasError={emailError !== ""}
              errorMessage={emailError}
              onFocus={() => setEmailError("")}
              {...(!!email.trim() && {
                onSubmitEditing: onSubmit,
              })}
            />
          </View>
          {renderSendButton()}
        </View>
      </KeyboardAware>
    );
  };

  const renderEmailSentContent = () => {
    return (
      <>
        <View style={styles.emailSentContent}>
          <MainText
            textAlign="center"
            fontSize={Metrics.fontSize.xLarge}
            fontWeight={"bold"}
          >
            {i18n.t("reset_password.check_your_email")}
          </MainText>
          <LottieView
            source={correct}
            style={styles.correctAnimation}
            autoPlay
            loop={false}
            speed={0.5}
          />
          <MainText textAlign="center" style={styles.emailWasSentText}>
            {i18n.t("reset_password.email_was_sent_with_a_link")}
          </MainText>
        </View>
        <Button onPress={goBack}>{i18n.t("reset_password.go_back")}</Button>
      </>
    );
  };

  const renderContent = () => {
    if (isEmailSent) return renderEmailSentContent();
    else return renderResetPasswordContent();
  };

  return (
    <MainView>
      <AnimatedView style={styles.container}>{renderContent()}</AnimatedView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.padding.large,
    paddingTop: Metrics.padding.large,
  },
  content: {
    paddingTop: Metrics.padding.large * 2,
    alignSelf: "center",
  },
  formContainer: {
    width: "100%",
  },
  title: {
    marginBottom: Metrics.padding.large,
  },
  input: {
    marginTop: Metrics.padding.large,
  },
  generalError: {
    paddingBottom: Metrics.padding.medium,
  },
  emailSentContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  correctAnimation: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2.5,
  },
  emailWasSentText: {
    marginBottom: Metrics.padding.medium,
  },
});

export default ForgotPassword;
