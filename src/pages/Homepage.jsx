import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import HeroSection from "../Components/HeroSection.jsx";
import Carousel from "../Components/ui/Carousel.jsx";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-40 dark:bg-gray">
        <Carousel />
        <HeroSection />
        <BestSeller />
      </div>
    </>
  );
}
