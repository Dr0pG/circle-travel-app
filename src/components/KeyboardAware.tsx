import React, { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type PropTypes = { children: React.ReactNode } & React.ComponentProps<
  typeof KeyboardAwareScrollView
>;

const KeyboardAware = ({ children, ...props }: PropTypes) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default memo(KeyboardAware);
