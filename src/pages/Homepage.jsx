import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import NavBar from "../Components/Header/NavBar";
import HeroSection from "../Components/HeroSection.jsx";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-40 dark:bg-gray">
        <NavBar />
        <HeroSection />
        <BestSeller />
      </div>
    </>
  );
}
