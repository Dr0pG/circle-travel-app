import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";

import Utils from "@/api/Utils";
import { transformObjectIntoArray } from "@/utils/Helper";

export type KnowYourWorldItem = {
  name: string;
  image: string;
  description?: string;
};

/**
 * Function to get all know your world items
 * @returns list of know your world items
 */
const getKnowYourWorld = async () => {
  const currentUser: FirebaseAuthTypes.User | null = getAuth().currentUser;
  if (!currentUser) return null;

  return Utils.database()
    .ref("/know_your_world")
    .once("value")
    .then((snapshot) => {
      const items = snapshot.val();

      const itemsArray: KnowYourWorldItem[] | null =
        transformObjectIntoArray(items);

      return itemsArray || [];
    });
};

export default { getKnowYourWorld };
