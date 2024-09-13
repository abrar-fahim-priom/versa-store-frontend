import React from "react";
import { MdClose } from "react-icons/md";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Darkmode from "../ui/Darkmode";

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
          <div className="xl:hidden pr-2 ">
            <Darkmode />
          </div>
          <a
            href="/home"
            onClick={onClickClose}
            className="capitalize dark:text-white pt-4 block"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            onClick={onClickClose}
            className="capitalize dark:text-white pt-4 block"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="/services"
            onClick={onClickClose}
            className="capitalize dark:text-white pt-4 block"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/contact"
            onClick={onClickClose}
            className="capitalize dark:text-white pt-4 block"
          >
            Contact
          </a>
        </li>
      </ul>

      <ul className="flex flex-col space-y-5 py-6 divide-y divide-neutral-300 dark:divide-neutral-600 border-b border-neutral-300 dark:border-neutral-600">
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Mobile
          </a>
        </li>
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Laptop
          </a>
        </li>
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Tablet
          </a>
        </li>
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Headphone
          </a>
        </li>
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Speaker
          </a>
        </li>
        <li>
          <a className="capitalize text-zinc-800 dark:text-white pt-4 font-semibold block">
            Smart Watch
          </a>
        </li>
      </ul>

      <div className="py-10 dark:text-white">
        <ButtonPrimary className="w-full">Log in</ButtonPrimary>
        <p className="mt-4 text-center">
          No account yet?{" "}
          <a href="/account/signup" className="underline">
            Create Account
          </a>
        </p>
        <ul className="flex mt-10 justify-center gap-8 text-lg">
          <li>
            <a className="text-lg" href="https://facebook.com">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a className="text-lg" href="https://twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a className="text-lg" href="https://instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMobile;
