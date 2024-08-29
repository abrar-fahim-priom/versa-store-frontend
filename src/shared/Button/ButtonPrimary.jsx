import React from "react";

const ButtonPrimary = ({ className, children, ...props }) => {
  const buttonClasses = `rounded bg-primary text-white hover:bg-primary/80 disabled:bg-opacity-70 dark:bg-white dark:text-black dark:hover:bg-white/80 ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
