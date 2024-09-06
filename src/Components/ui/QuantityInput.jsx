import React, { useEffect, useState } from "react";

const QuantityInput = ({
  className = "w-fit",
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
    onChange && onChange(value - 1);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => state + 1);
    onChange && onChange(value + 1);
  };

  return (
    <div
      className={`nc-InputNumber border-2 rounded-md border-primary/15 dark:border-neutral-500 flex items-center justify-between space-x-5 ${className}`}
    >
      {label && (
        <div className="flex flex-col">
          <span className="font-medium">{label}</span>
          {desc && (
            <span className="text-xs font-normal text-neutral-500">{desc}</span>
          )}
        </div>
      )}
      <div className="nc-NcInputNumber__content text-primary dark:text-neutral-100 flex w-[104px] items-center justify-between">
        <button
          className="flex h-8 w-8 items-center justify-center text-xl focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          -
        </button>
        <span className="block w-6 select-none text-center leading-none">
          {value}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center text-xl focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
