import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import versaStoreLogo from "../../assets/versaStore-logo.png";
import Darkmode from "../ui/Darkmode";

import CartSideBar from "./CartSideBar";
import CatalogBar from "./CatalogBar";
import MenuBar from "./MenuBar";
import UserAccount from "./UserAccount";

// Dummy data for navigation links
const navLinks = [
  { id: "1", href: "/home", name: "Home" },
  { id: "2", href: "/orders", name: "My Orders" },

  { id: "3", href: "/contact", name: "Contact" },
];

const Input = ({ type, className, placeholder }) => (
  <input type={type} className={className} placeholder={placeholder} />
);

const Logo = () => (
  <Link className="flex cursor-pointer items-center gap-1" to="/">
    <img src={versaStoreLogo} className="w-10" alt="" />
    <span className={`text-2xl font-bold dark:text-white`}>VersaStore</span>
  </Link>
);

const MainNav = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-6 py-3 lg:py-4">
        <div className="xl:hidden">
          <MenuBar />
        </div>
        <div className="relative flex items-center gap-5 xl:grow">
          <Logo />
          <CatalogBar className="hidden xl:inline-block" />
          <div className="hidden w-full max-w-[300px] items-center gap-2 rounded border-2 border-primary/15 bg-white pr-2 transition-all duration-300 hover:border-primary dark:border-white/15 dark:bg-neutral-950 xl:flex">
            <Input
              type="text"
              className="flex-grow w-full border-transparent dark:bg-gray placeholder:text-neutral-500 focus:border-transparent py-2 px-3"
              placeholder="What are you looking for ..."
            />
            <RiSearch2Line className="text-2xl dark:text-neutral-500 text-neutral-500" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden xl:block">
            <ul className="flex">
              {navLinks.map((navItem) => (
                <li
                  key={navItem.id}
                  className="p-3 text-sm text-neutral-500 hover:font-semibold hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  <Link to={navItem.href}>{navItem.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center">
            <div className="hidden pr-2 xl:inline-block">
              <Darkmode />
            </div>
            <div className="hidden lg:inline-block">
              <UserAccount />
            </div>
            <CartSideBar />
          </div>
        </div>
      </div>
      <div className="pb-2 xl:hidden">
        <div className="flex items-center border border-neutral-300 bg-white pr-3 dark:bg-neutral-950">
          <Input
            type="text"
            className="flex-grow border-transparent placeholder:text-neutral-500 focus:border-transparent py-2 px-3"
            placeholder="What are you looking for ..."
          />
          <RiSearch2Line className="text-2xl text-neutral-500 ml-2" />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
