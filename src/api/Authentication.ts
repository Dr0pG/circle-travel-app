import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  signOut as FirebasesSignOut,
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";

import Toast from "@/components/Toast";

import Utils from "@/api/Utils";

import i18n from "@/i18n";

/**
 * Function to login the user
 * @param email
 * @param password
 */
const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .then(async () => {
      Toast.showSuccess(i18n.t("api.login_successfully"));
    })
    .catch((error) => {
      let currentError = null;
      if (error.code === "auth/email-already-in-use") {
        currentError = i18n.t("api.that_email_address_is_already_in_use");
      }

      if (error.code === "auth/invalid-email") {
        currentError = i18n.t("api.that_email_address_is_invalid");
      }

      if (error.code === "auth/invalid-credential") {
        currentError = i18n.t(
          "api.the_supplied_authentication_credential_is_malformed_or_has_expired"
        );
      }

      return Promise.reject(currentError);
    });
};

type RegisterUserSignUpForm = {
  name: string;
  email: string;
  password: string;
};

/**
 * Function to register a new user
 * @param name
 * @param email
 * @param password
 */
const registerUser = async (form: RegisterUserSignUpForm) => {
  return createUserWithEmailAndPassword(getAuth(), form.email, form.password)
    .then((userCredential: FirebaseAuthTypes.UserCredential) => {
      // Now update the user's profile with their name
      const currentUser = userCredential.user;

      currentUser.updateProfile({
        displayName: form.name, // Store the name in the displayName field
      });

      // Get the user ID (uid) from Firebase Authentication
      const userId = userCredential.user.uid;

      // Create the user object to store in the Realtime Database
      const user = {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      };

      // Set the user object in the Realtime Database under a path like {userId}
      Utils.database()
        .ref(`/${userId}`)
        .set(user)
        .then(() => {
          Toast.showSuccess(i18n.t("api.account_created_successfully"));
        })
        .catch(() => {
          const currentError = i18n.t(
            "there_was_a_problem_creating_your_account"
          );
          Toast.showError(currentError);

          return Promise.reject(currentError);
        });
    })
    .catch((error) => {
      let currentError = null;

      if (error.code === "auth/email-already-in-use") {
        currentError = i18n.t("api.account_already_exists");
      }

      if (error.code === "auth/invalid-email") {
        currentError = i18n.t("api.that_email_address_is_invalid");
      }

      return Promise.reject(currentError);
    });
};

/**
 * Function to log out the user
 */
const signOut = () => {
  FirebasesSignOut(getAuth())
    .then(async () => {
      Toast.showSuccess(i18n.t("user_logout_successfully"));
    })
    .catch(() => {
      Toast.showError(i18n.t("something_went_wrong"));
    });
};

export default { loginUser, registerUser, signOut };
