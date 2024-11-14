import React from "react";
import { MdClose } from "react-icons/md";

import BottomNavMobile from "./BottomNavMobile";

const NavMobile = ({ onClickClose }) => {
  return (
    <div className="h-screen w-full overflow-y-auto bg-white px-5 py-2 shadow-lg ring-1 transition dark:bg-gray">
      <div className="border-b border-neutral-300 py-2 dark:border-neutral-600 relative">
        <div className="block" />
        <span
          className="absolute right-2 top-2 p-1 cursor-pointer"
          onClick={onClickClose}
        >
          <MdClose className="dark:text-white" />
        </span>
      </div>

      <ul className="flex flex-col space-y-5 py-6 divide-y divide-neutral-300 dark:divide-neutral-600 border-b border-neutral-300 dark:border-neutral-600">
        <li>
          <BottomNavMobile onClickClose={onClickClose} />
        </li>
      </ul>
    </div>
  );
};

export default NavMobile;
