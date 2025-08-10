export enum ScreenName {
  OnBoarding = "OnBoarding",
  SignIn = "SignIn",
  SignUp = "SignUp",
  ForgotPassword = "ForgotPassword",

  HomeTabs = "HomeTabs",

  Home = "Home",
  Favorite = "Favorite",
  Inbox = "Inbox",
  More = "More",

  NotFound = "NotFound",
}

export type RootStackParamList = {
  [ScreenName.OnBoarding]: undefined;
  [ScreenName.SignIn]: undefined;
  [ScreenName.SignUp]: undefined;
  [ScreenName.ForgotPassword]: undefined;
  [ScreenName.HomeTabs]: undefined;
  [ScreenName.Home]: undefined;
  [ScreenName.Favorite]: undefined;
  [ScreenName.Inbox]: undefined;
  [ScreenName.More]: undefined;
  [ScreenName.NotFound]: undefined;
};
