import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import NavBar from "../Components/Header/NavBar";
import HeroSection from "../Components/HeroSection.jsx";
import Carousel from "../Components/ui/Carousel.jsx";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-40 dark:bg-gray">
        <NavBar />
        <Carousel />
        <HeroSection />
        <BestSeller />
      </div>
    </>
  );
}
