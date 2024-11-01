import BottomNav from "./BottomNav";
import MainNav from "./MainNav";

export default function NavBar() {
  return (
    <div className="nc-Header sticky top-0 z-40 w-full bg-neutral-100 transition-transform duration-200 dark:bg-gray shadow">
      <MainNav />

      <BottomNav />
    </div>
  );
}
