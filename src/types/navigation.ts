export enum ScreenName {
  OnBoarding = "OnBoarding",
  HomeTabs = "HomeTabs",

  SignIn = "SignIn",
  SignUp = "SignUp",
  ForgotPassword = "ForgotPassword",

  NotFound = "NotFound",
}

export type RootStackParamList = {
  [ScreenName.OnBoarding]: undefined;
  [ScreenName.HomeTabs]: undefined;
  [ScreenName.SignIn]: undefined;
  [ScreenName.SignUp]: undefined;
  [ScreenName.ForgotPassword]: undefined;
  [ScreenName.NotFound]: undefined;
};
