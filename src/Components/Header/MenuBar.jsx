import { useState } from "react";
import NavMobile from "./NavMobile";

const MenuBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="flex items-center justify-center rounded-lg p-2.5 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-7 dark:text-white "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 dark:text-white bg-neutral-900/60 z-40 transition-opacity ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCloseMenu}
      />

      {/* Sidebar with sliding transition */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-md transition-transform duration-300 transform bg-white shadow-lg ring-1 ring-black/5 md:w-auto ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative z-50 h-full">
          <NavMobile onClickClose={handleCloseMenu} />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
