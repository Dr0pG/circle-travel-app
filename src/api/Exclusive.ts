import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";

import Utils from "@/api/Utils";

import { transformObjectIntoArray } from "@/utils/Helper";

export type ExclusivePackage = {
  name: string;
  location: string;
  rating: number;
  image: string;
};

export type ExclusivePackageList = {
  locations: string[];
  packages: ExclusivePackage[];
};

/**
 * Function to get all exclusive packages
 * @returns list of exclusive packages
 */
const getExclusivePackages = async () => {
  const currentUser: FirebaseAuthTypes.User | null = getAuth().currentUser;
  if (!currentUser) return null;

  return Utils.database()
    .ref("/exclusive")
    .once("value")
    .then((snapshot) => {
      const packages = snapshot.val();

      const packagesArray: ExclusivePackage[] | null =
        transformObjectIntoArray(packages);

      if (!packagesArray) {
        return { locations: [], packages: [] } as ExclusivePackageList;
      }

      const locations = [
        ...new Set(packagesArray.map((pkg) => pkg.location)),
      ].sort();

      const sortedPackages = packagesArray.sort(
        (a: ExclusivePackage, b: ExclusivePackage) =>
          a.location.localeCompare(b.location)
      );

      return {
        locations,
        packages: sortedPackages,
      } as ExclusivePackageList;
    });
};

export default { getExclusivePackages };
