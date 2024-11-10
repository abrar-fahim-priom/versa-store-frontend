import Banner from "../Components/BestSeller/Banner.jsx";
import BannerLow from "../Components/BestSeller/BannerLow.jsx";
import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import PhoneBestSeller from "../Components/BestSeller/PhoneBestSeller.jsx";
import ProductShowcaseMarquee from "../Components/BestSeller/ProductShowcaseMarquee.jsx";
import HeroSection from "../Components/HeroSection.jsx";
import Carousel from "../Components/ui/Carousel.jsx";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-40 overflow-x-hidden dark:bg-gray">
        <Carousel />
        <HeroSection />
        <BestSeller />
        <Banner />
        <PhoneBestSeller />
        <BannerLow />
        <ProductShowcaseMarquee />
      </div>
    </>
  );
}
