import BottomNav from "./BottomNav";
import MainNav from "./MainNav";

export default function NavBar() {
  return (
    <div
      className="nc-Header sticky top-0 z-40 w-full bg-neutral-100 transition-transform 
             duration-200 dark:bg-gray shadow
             px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5"
    >
      <MainNav />

      <BottomNav />
    </div>
  );
}
