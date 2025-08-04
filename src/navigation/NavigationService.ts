import { RootStackParamList, ScreenName } from "@/types/navigation";
import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate(name: ScreenName, params?: RootStackParamList[ScreenName]) {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
}

function replace(name: ScreenName, params?: RootStackParamList[ScreenName]) {
  if (navigationRef.isReady())
    navigationRef.dispatch(StackActions.replace(name, params));
}

function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack())
    navigationRef.goBack();
}

function resetTo(name: ScreenName, params?: RootStackParamList[ScreenName]) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name, params }],
    });
  }
}

export { goBack, navigate, replace, resetTo };
