import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";

import Utils from "@/api/Utils";
import { transformObjectIntoArray } from "@/utils/Helper";

export type RecommendedPackage = {
  name: string;
  type: "solo" | "family";
  rating: number;
  image: string;
};

export type RecommendedPackageList = {
  solo: RecommendedPackage[];
  family: RecommendedPackage[];
};

/**
 * Function to get all recommended packages
 * @returns list of recommended packages
 */
const getRecommendedPackages = async () => {
  const currentUser: FirebaseAuthTypes.User | null = getAuth().currentUser;
  if (!currentUser) return null;

  return Utils.database()
    .ref("/recommended")
    .once("value")
    .then((snapshot) => {
      const packages = snapshot.val();

      const packagesArray: RecommendedPackage[] | null =
        transformObjectIntoArray(packages);

      const grouped = packagesArray?.reduce<RecommendedPackageList>(
        (acc, pck) => {
          if (pck.type in acc)
            acc[pck.type as keyof RecommendedPackageList].push(pck);

          return acc;
        },
        { solo: [], family: [] }
      );

      return grouped ?? { solo: [], family: [] };
    });
};

export default { getRecommendedPackages };
