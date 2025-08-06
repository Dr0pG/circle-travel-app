import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import AnimatedView from "@/components/AnimatedView";

import { Colors } from "@/utils/Colors";
import { Metrics } from "@/utils/Metrics";

type PropTypes = TextInputProps & {
  icon?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
  secureTextEntry?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

const Input = forwardRef<RNTextInput, PropTypes>(
  (
    {
      icon,
      placeholder,
      keyboardType = "default",
      secureTextEntry = false,
      hasError = false,
      errorMessage,
      style,
      onFocus = () => {},
      ...props
    }: PropTypes,
    ref
  ) => {
    const [showError, setError] = useState<boolean>(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

    useEffect(() => {
      setError(hasError);
    }, [hasError]);

    const onChangeVisiblePassword = () =>
      setIsVisiblePassword(!isVisiblePassword);

    const renderIcon = useCallback(() => {
      if (!icon) return;

      switch (icon) {
        case "search": {
          return (
            <AntDesign
              name="search1"
              size={Metrics.iconInput}
              color={Colors.text}
              style={styles.icon}
            />
          );
        }
        case "name":
          return (
            <AntDesign
              name="user"
              size={Metrics.iconInput}
              color={Colors.text}
              style={styles.icon}
            />
          );
        case "email":
          return (
            <Entypo
              name="email"
              size={Metrics.iconInput}
              color={Colors.text}
              style={styles.icon}
            />
          );
        default:
          return null;
      }
    }, [icon]);

    const renderPasswordIcon = useCallback(() => {
      if (icon !== "password" || (errorMessage && showError)) return;

      return (
        <Entypo
          name={isVisiblePassword ? "eye-with-line" : "eye"}
          size={Metrics.iconInput}
          color={Colors.textInputPlaceholder}
          onPress={onChangeVisiblePassword}
        />
      );
    }, [isVisiblePassword, errorMessage, showError]);

    const renderErrorIcon = useCallback(() => {
      if (!errorMessage && !showError) return;

      return (
        <AnimatedView>
          <Entypo
            name="circle-with-cross"
            size={Metrics.iconInput}
            color={Colors.error}
            onPress={() => {
              setError(false);
              ref?.current?.clear();
            }}
          />
        </AnimatedView>
      );
    }, [errorMessage, showError]);

    const renderErrorText = useCallback(() => {
      if (!errorMessage && !showError) return;

      return (
        <AnimatedView style={styles.errorText}>{errorMessage}</AnimatedView>
      );
    }, [errorMessage, showError]);

    return (
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            showError && { borderColor: Colors.error },
            style,
          ]}
        >
          {renderIcon()}
          <RNTextInput
            ref={ref}
            placeholder={placeholder}
            style={[styles.input, { color: Colors.text }]}
            placeholderTextColor={Colors.textInputPlaceholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry && !isVisiblePassword}
            onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
              onFocus?.(e);
              setError(false);
            }}
            {...props}
          />
          {renderPasswordIcon()}
          {renderErrorIcon()}
        </View>
        {renderErrorText()}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Metrics.padding.medium,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.textInputBackground,
    borderWidth: 0,
    borderRadius: Metrics.borderRadius.small,
    paddingHorizontal: Metrics.padding.medium,
  },
  icon: {
    marginRight: Metrics.padding.medium,
  },
  input: {
    flex: 1,
    height: Metrics.inputHeight,
  },
  bigInput: {
    height: Metrics.inputHeight * 2,
    textAlignVertical: "top",
    paddingTop: Metrics.padding.small,
  },
  errorText: {
    marginTop: Metrics.padding.small,
  },
});

export default memo(Input);
