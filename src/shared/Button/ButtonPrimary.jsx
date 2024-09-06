import React from "react";

const ButtonPrimary = ({ className, children, ...props }) => {
  const buttonClasses = `w-full relative font-bold h-auto inline-flex items-center justify-center gap-1 rounded transition-colors group py-3 px-4 sm:py-3 sm:px-6 text-sm rounded bg-primary text-white hover:bg-primary/80 disabled:bg-opacity-70 dark:bg-white dark:text-black dark:hover:bg-white/80 whitespace-nowrap ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
