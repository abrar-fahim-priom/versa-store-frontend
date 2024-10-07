import BestSeller from "../Components/BestSeller/BestSeller.jsx";
import NavBar from "../Components/Header/NavBar";
import HeroSection from "../Components/HeroSection.jsx";

export default function Homepage() {
  return (
    <>
      <div className="bg-neutral-100 z-50 dark:bg-gray">
        <NavBar />
        <HeroSection />
        <BestSeller />

        <div className="h-[400px] bg-red-400 grid grid-rows-2 grid-cols-6 rounded-md opacity-30 m-5">
          <div className="bg-slate-600 row-span-2  col-span-2"></div>
          <div className="bg-blue-600  row-span-2 col-span-1"></div>
          <div className="bg-orange-500 row-span-1 col-span-3"></div>
          <div className="bg-green-400 row-span-1 col-span-3"></div>
        </div>
      </div>
    </>
  );
}
