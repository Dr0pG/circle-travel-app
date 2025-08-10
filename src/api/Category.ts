import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";

import Utils from "@/api/Utils";

import { splitStringIntoArray } from "@/utils/Helper";

/**
 * Function to get all categories
 * @returns list of categories
 */
const getCategories = async () => {
  const currentUser: FirebaseAuthTypes.User | null = getAuth().currentUser;
  if (!currentUser) return null;

  return Utils.database()
    .ref("/category")
    .once("value")
    .then((snapshot) => {
      const categories = snapshot.val();

      const categoriesArray: string[] | null = splitStringIntoArray(
        categories.list
      );
      return categoriesArray || [];
    });
};

export default { getCategories };
