export enum ScreenName {
  OnBoarding = "OnBoarding",
  HomeTabs = "HomeTabs",

  SignIn = "SignIn",
  SignUp = "SignUp",

  NotFound = "NotFound",
}

export type RootStackParamList = {
  [ScreenName.OnBoarding]: undefined;
  [ScreenName.HomeTabs]: undefined;
  [ScreenName.SignIn]: undefined;
  [ScreenName.SignUp]: undefined;
  [ScreenName.NotFound]: undefined;
};
