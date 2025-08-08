import { Dimensions } from "react-native";

export const Metrics = {
  onboarding: {
    page: {
      width: 375, // Default width for onboarding pages
      height: 667, // Default height for onboarding pages
    },
    dot: {
      width: 10, // Width of the dots in the onboarding indicator
      height: 10, // Height of the dots in the onboarding indicator
      borderRadius: 5, // Border radius for the dots
      marginHorizontal: 3, // Spacing between dots in the onboarding indicator
    },
    dotSize: 10, // Default size of the dots in the onboarding indicator
    dotExpandedSize: 24, // Size of the expanded dot in the onboarding indicator
  },
  padding: {
    small: 8, // Small padding
    medium: 16, // Medium padding
    large: 24, // Large padding
    xLarge: 32, // Extra large padding
  },
  fontSize: {
    small: 8, // Small font size
    medium: 12, // Medium font size
    regular: 14, // Regular font size
    large: 20, // Large font size
    xLarge: 24, // Extra large font size
  },
  borderRadius: {
    small: 4, // Small border radius
    medium: 8, // Medium border radius
    large: 12, // Large border radius
    xLarge: 16, // Extra large border radius
  },
  iconInput: 24, // Default size for input icons
  imageHeight: 200, // Default height for images
  inputHeight: 50, // Default height for input fields
  backButton: 28,
  tabBarHeight: 70,
  tabBarIconSize: 22,
  hitSlop: { top: 15, bottom: 15, left: 15, right: 15 }, // Default hit slop for touchable elements
  screenWidth: Dimensions.get("window").width, // Width of the device screen
  screenHeight: Dimensions.get("window").height, // Height of the device screen
};
