import React, { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import MainNav from "./MainNav";

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Make the bottom nav visible when scrolling up
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className="nc-Header sticky top-0 z-40 w-full bg-neutral-100 dark:bg-gray shadow-md px-6  md:px-8 transition-colors duration-200">
        <MainNav />
      </div>
      <div
        className={`nc-Header fixed top-0 w-screen  z-30 bg-neutral-100 dark:bg-gray shadow-lg transition-all duration-300 transform ${
          visible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <BottomNav />
      </div>
    </>
  );
}
