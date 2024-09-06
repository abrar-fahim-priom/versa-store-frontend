import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import NavBar from "../Components/Header/NavBar";
import HeroSection from "../Components/HeroSection.jsx";
import { CardHoverEffectDemo } from "../Components/ui/CardHoverEffectDemo";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-50 dark:bg-gray">
        <NavBar />
        <HeroSection />
        <BestSeller />
        <CardHoverEffectDemo />
      </div>
    </>
  );
}
