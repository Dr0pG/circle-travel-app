import beach from "@/assets/category/beach.jpg";
import desert from "@/assets/category/desert.jpg";
import forest from "@/assets/category/forest.jpg";
import jungle from "@/assets/category/jungle.jpg";
import lake from "@/assets/category/lake.jpg";
import mountain from "@/assets/category/mountain.jpg";
import river from "@/assets/category/river.jpg";
import volcano from "@/assets/category/volcano.jpg";

import i18n from "@/i18n";

export const getDefaultStyle = (isLight: boolean) => ({
  color: isLight ? "rgba(0, 0, 0, 0.8)" : "#fff",
});

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return i18n.t("home.good_morning");
  } else if (hour >= 12 && hour < 18) {
    return i18n.t("home.good_afternoon");
  } else if (hour >= 18 && hour < 22) {
    return i18n.t("home.good_evening");
  } else {
    return i18n.t("home.good_night");
  }
};

export const transformObjectIntoArray = (arr: any[]) => {
  const formattedArray = arr
    ? Object.entries(arr).map(([id, item]) => ({
        id,
        ...item,
      }))
    : [];

  return formattedArray;
};

export const splitStringIntoArray = (
  str: string = "",
  splitValue: string = ","
) => {
  if (!str) return [];
  const cleanString = str.replace(/\s/g, "");
  return cleanString.split(splitValue);
};

export enum TravelCategoryType {
  Mountain = "mountain",
  Beach = "beach",
  Desert = "desert",
  Forest = "forest",
  Lake = "lake",
  River = "river",
  Jungle = "jungle",
  Volcano = "volcano",
}

export const getCategorySource = (category: TravelCategoryType) => {
  switch (category) {
    case TravelCategoryType.Mountain:
      return mountain;
    case TravelCategoryType.Beach:
      return beach;
    case TravelCategoryType.Desert:
      return desert;
    case TravelCategoryType.Forest:
      return forest;
    case TravelCategoryType.Lake:
      return lake;
    case TravelCategoryType.River:
      return river;
    case TravelCategoryType.Jungle:
      return jungle;
    case TravelCategoryType.Volcano:
      return volcano;
    default:
      return mountain;
  }
};
