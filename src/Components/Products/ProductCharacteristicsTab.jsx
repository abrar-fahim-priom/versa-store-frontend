import React from "react";
import { productCharacterData } from "../../data/content";

const ProductCharacteristicsTab = () => {
  return (
    <div className="">
      <details className="group dark:text-white">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5">
          <div className="space-x-6 group-open:text-primary dark:group-open:text-white">
            <span>Characteristics</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="block size-5 group-open:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hidden size-5 group-open:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
        </summary>
        <div className="pb-4 text-sm">
          <ul className="divide-y divide-neutral-300 dark:divide-neutral-400">
            {productCharacterData.map((listItem) => (
              <li className="mb-4 pt-4" key={listItem.title}>
                <div className="flex justify-between gap-3">
                  <div className="basis-1/5">
                    <span className="font-medium">{listItem.title}</span>
                  </div>
                  <div className="basis-4/5">
                    <p className="text-neutral-500 dark:text-neutral-300">
                      {listItem.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
};

export default ProductCharacteristicsTab;
