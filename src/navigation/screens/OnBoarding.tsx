import MainView from "@/components/MainView";
import OnBoarding from "@/components/onBoarding";

import slide1 from "@/assets/onBoarding/slide1.png";
import slide2 from "@/assets/onBoarding/slide2.png";
import slide3 from "@/assets/onBoarding/slide3.png";

import i18n from "@/i18n";

const OnBoardingScreen = () => {
  return (
    <MainView>
      <OnBoarding
        slides={[
          {
            title: i18n.t("onboarding.slide1.title"),
            subtitle: i18n.t("onboarding.slide1.description"),
            image: slide1,
          },
          {
            title: i18n.t("onboarding.slide2.title"),
            subtitle: i18n.t("onboarding.slide2.description"),
            image: slide2,
          },
          {
            title: i18n.t("onboarding.slide3.title"),
            subtitle: i18n.t("onboarding.slide3.description"),
            image: slide3,
          },
        ]}
      />
    </MainView>
  );
};

export default OnBoardingScreen;
