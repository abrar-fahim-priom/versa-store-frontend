import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import FirstImage from "../images/Group_103-1.webp";
import ThirdImage from "../images/Group_105.webp";
import FourthImage from "../images/Group_106.webp";
import SecondImage from "../images/Group_157.webp";
import ShopNowButton from "../shared/Button/ShopNowButton.jsx";

export default function HeroSection() {
  const { auth } = useAuth();
  // console.log(auth);
  return (
    <section>
      <div className="container relative mt-5 pb-8 xl:pb-24">
        <div className="grid grid-cols-4 gap-2 lg:grid-rows-2">
          {/* First Banner */}
          <NavLink
            to="/categories/670564515858fa34536cdef8"
            className="group relative col-span-4 overflow-hidden rounded-md p-8 lg:col-span-1 lg:first:col-span-2 lg:first:row-span-2 lg:first:p-8 xl:first:px-14 lg:[&:nth-child(2)]:row-span-2"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={FirstImage}
                alt="First Banner"
                className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-100 scale-105 dark:opacity-60"
              />
            </div>
            <div className="relative z-10">
              <span className="text-xs text-primary dark:text-white">
                <span className="inline-block size-1 rounded-full bg-green-600 dark:bg-white"></span>
                IN STOCK NOW
              </span>
              <h2 className="mb-2 text-4xl font-bold leading-tight md:mt-16 md:w-[80%] lg:mt-10">
                Buy Smartphones !
              </h2>
              <p className="mb-4 w-4/5 text-neutral-500 dark:text-white md:w-1/2">
                Find your perfect phone - sleek and stylish or budget-friendly.
              </p>
              <div className="md:mt-16 lg:mt-10">
                <button className="shop-now-button">
                  <ShopNowButton />
                </button>
              </div>
            </div>
          </NavLink>

          {/* Second Banner */}
          <NavLink
            to="/categories/670565845858fa34536cdf07"
            className="group relative col-span-4 overflow-hidden rounded-md p-8 lg:col-span-1 lg:first:col-span-2 lg:first:row-span-2 lg:first:p-8 xl:first:px-14 lg:[&:nth-child(2)]:row-span-2"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={SecondImage}
                alt="Second Banner"
                className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-100 scale-105 dark:opacity-60"
              />
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-auto inline-block text-xs">
                <span className="inline-block rounded bg-white px-3 py-1 font-semibold uppercase ">
                  Gaming
                </span>
              </span>
              <h3 className="w-2/3 font-semibold dark:text-white leading-tight tracking-tight">
                Discover ideal gaming solutions
              </h3>
            </div>
          </NavLink>

          {/* Third Banner */}
          <NavLink
            to="/categories/670565665858fa34536cdf04"
            className="group relative col-span-4 overflow-hidden rounded-md p-8 lg:col-span-1 lg:first:col-span-2 lg:first:row-span-2 lg:first:p-8 xl:first:px-14 lg:[&:nth-child(2)]:row-span-2"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={ThirdImage}
                alt="Third Banner"
                className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-100 scale-105 dark:opacity-60"
              />
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-auto inline-block text-xs">
                <span className="inline-block rounded bg-white px-3 py-1 font-semibold uppercase ">
                  Headphones
                </span>
              </span>
              <h3 className="w-2/3 font-semibold dark:text-white leading-tight tracking-tight">
                Hear the Difference
              </h3>
            </div>
          </NavLink>

          {/* Fourth Banner */}
          <NavLink
            to="/categories/670565355858fa34536cdefe"
            className="group relative col-span-4 overflow-hidden rounded-md p-8 lg:col-span-1 lg:first:col-span-2 lg:first:row-span-2 lg:first:p-8 xl:first:px-14 lg:[&:nth-child(2)]:row-span-2"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={FourthImage}
                alt="Fourth Banner"
                className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-100 scale-105 dark:opacity-60"
              />
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-auto inline-block text-xs">
                <span className="inline-block rounded bg-white px-3 py-1 font-semibold uppercase ">
                  Smart Watches
                </span>
              </span>
              <h3 className="w-2/3 font-semibold dark:text-white leading-tight tracking-tight">
                Experience the Latest Technology
              </h3>
            </div>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
