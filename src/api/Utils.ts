import { firebase } from "@react-native-firebase/database";

/**
 * Function to return all the function of firebase database
 */
function database() {
  return firebase.app().database(process.env.EXPO_PUBLIC_FIREBASE_URL);
}

export default { database };
