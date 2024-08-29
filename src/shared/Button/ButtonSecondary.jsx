import React from "react";

const ButtonSecondary = ({ className, children, ...props }) => {
  const buttonClasses = `text-primary border-2 px-4 py-2 rounded border-primary/15 dark:border-neutral-500 dark:text-white hover:border-primary transition-all duration-200 text-base ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default ButtonSecondary;
