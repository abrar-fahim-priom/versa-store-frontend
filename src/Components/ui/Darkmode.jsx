import React from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

const Darkmode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap text-sm dark:text-white font-semibold">
        Dark Mode
      </span>
      <label
        htmlFor="check"
        className="relative h-[24px] w-[50px] cursor-pointer rounded-full bg-neutral-200"
      >
        <input
          id="check"
          type="checkbox"
          className="peer sr-only"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <span className="absolute left-1 top-1 aspect-square w-1/3 rounded-full bg-white transition-all duration-150 peer-checked:left-7 dark:bg-black" />
        {darkMode ? (
          <span className="absolute left-2 top-[3px] text-sm font-medium dark:text-black">
            On
          </span>
        ) : (
          <span className="absolute left-6 top-[3px] text-sm font-medium dark:text-black">
            Off
          </span>
        )}
      </label>
    </div>
  );
};

export default Darkmode;
