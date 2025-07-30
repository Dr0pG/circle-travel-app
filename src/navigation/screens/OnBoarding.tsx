import MainView from "@/components/MainView";
import OnBoarding from "@/components/onBoarding";

import slide1 from "@/assets/onBoarding/slide1.png";
import slide2 from "@/assets/onBoarding/slide2.png";
import slide3 from "@/assets/onBoarding/slide3.png";

const OnBoardingScreen = () => {
  return (
    <MainView>
      <OnBoarding
        slides={[
          {
            title: "Plan Your Trip",
            subtitle: "Save places and book your perfect trip with Circle App",
            image: slide1,
          },
          {
            title: "Begin The Adventure",
            subtitle:
              "Begin The Cirlce App with Alone or your family & friends",
            image: slide2,
          },
          {
            title: "Enjoy Your Trip",
            subtitle: "Enjoy your Circle Travel Package and stay relax",
            image: slide3,
          },
        ]}
      />
    </MainView>
  );
};

export default OnBoardingScreen;
