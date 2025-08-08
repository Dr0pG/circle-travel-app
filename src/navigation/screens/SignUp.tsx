import { useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";

import { omit } from "lodash";

import { Image } from "expo-image";

import { navigate } from "@/navigation/NavigationService";

import AnimatedView from "@/components/AnimatedView";
import Button from "@/components/Button";
import KeyboardAware from "@/components/KeyboardAware";
import MainText from "@/components/MainText";
import MainView from "@/components/MainView";
import Input from "@/components/TextInput";
import TouchableOpacity from "@/components/TouchableOpacity";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";
import Validations, { SignUpForm } from "@/utils/Validations";

import { ScreenName } from "@/types/navigation";

import register from "@/assets/register.png";

import Authentication from "@/api/Authentication";
import i18n from "@/i18n";

const onNavigateToSignIn = () => navigate(ScreenName.SignIn);

const SignUp = () => {
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, serError] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [generalError, setGeneralError] = useState<string | null>();

  const isFormFilled = Object.values(form).every((value) =>
    typeof value === "string" ? value.trim() !== "" : false
  );

  const onSubmit = async () => {
    Keyboard.dismiss();

    setGeneralError(null);

    const validate = Validations.validateSignUp(form);

    if (!validate.success) return serError(validate.errors ?? error);

    try {
      setIsLoading(true);
      await Authentication.registerUser(omit(form, ["confirmPassword"]));
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
        {i18n.t("sign_up.title")}
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
          ref={nameInputRef}
          placeholder={`${i18n.t("sign_up.your_name")}`}
          keyboardType="default"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(name: string) =>
            setForm((prev) => ({ ...prev, name }))
          }
          value={form.name}
          hasError={error.name !== ""}
          errorMessage={error.name}
          onFocus={() => serError({ ...error, name: "" })}
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />
        <Input
          ref={emailInputRef}
          placeholder={`${i18n.t("sign_up.your_email")}`}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(email: string) =>
            setForm((prev) => ({ ...prev, email: email.toLowerCase() }))
          }
          value={form.email}
          hasError={error.email !== ""}
          errorMessage={error.email}
          onFocus={() => serError({ ...error, email: "" })}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          icon="password"
          placeholder={i18n.t("sign_up.your_password")}
          secureTextEntry
          returnKeyType="next"
          textContentType="oneTimeCode"
          autoComplete="password"
          onChangeText={(password: string) =>
            setForm((prev) => ({ ...prev, password }))
          }
          value={form.password}
          hasError={error.password !== ""}
          errorMessage={error.password}
          onFocus={() => serError({ ...error, password: "" })}
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
        />
        <Input
          ref={confirmPasswordInputRef}
          icon="password"
          placeholder={i18n.t("sign_up.confirm_password")}
          secureTextEntry
          returnKeyType="send"
          textContentType="oneTimeCode"
          autoComplete="password"
          onChangeText={(confirmPassword: string) =>
            setForm((prev) => ({ ...prev, confirmPassword }))
          }
          value={form.confirmPassword}
          hasError={error.confirmPassword !== ""}
          errorMessage={error.confirmPassword}
          onFocus={() => serError({ ...error, confirmPassword: "" })}
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
        {i18n.t("sign_up.registration")}
      </Button>
    );
  };

  const renderBottomInfo = () => {
    return (
      <View style={styles.noAccountContainer}>
        <MainText textAlign="center">
          {i18n.t("sign_up.already_have_an_account")}
        </MainText>
        <TouchableOpacity disabled={isLoading} onPress={onNavigateToSignIn}>
          <MainText
            textAlign="center"
            fontWeight={"bold"}
            color={Colors.primary}
          >
            {` ${i18n.t("sign_up.sign_in")}`}
          </MainText>
        </TouchableOpacity>
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
          <Image source={register} style={styles.image} contentFit="contain" />
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
    paddingVertical: Metrics.padding.small,
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

export default SignUp;
