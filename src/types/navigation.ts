export enum ScreenName {
  OnBoarding = "OnBoarding",
  HomeTabs = "HomeTabs",
  NotFound = "NotFound",
}

export type RootStackParamList = {
  [ScreenName.OnBoarding]: undefined;
  [ScreenName.HomeTabs]: undefined;
  [ScreenName.NotFound]: undefined;
};
