import BottomNav from "./BottomNav";
import MainNav from "./MainNav";

export default function NavBar() {
  return (
    <div className="nc-Header sticky top-0 z-40 w-full bg-neutral-100 dark:bg-gray shadow-lg px-6 py-2 md:px-8 md:py-3 transition-colors duration-200">
      <MainNav />
      <BottomNav />
    </div>
  );
}
