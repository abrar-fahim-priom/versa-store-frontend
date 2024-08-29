import React, { useState } from "react";
import banner1 from "../../images/banner-1_3.webp";
import banner2 from "../../images/banner-1_4.webp";

const footerLinks = [
  { name: "Starter Site 1", href: "#" },
  { name: "Starter Site 2", href: "#" },
  { name: "Starter Site 3", href: "#" },
  { name: "Collection 1", href: "#" },
  { name: "Collection 2", href: "#" },
  { name: "Collection 3", href: "#" },
];

import ShopNowButton2 from "../../shared/Button/ShopNowButton2.jsx";

const CatalogBar = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <div className={`flex flex-row ${className}`}>
      <button onClick={handleOpenMenu} className="shop-now-button">
        <ShopNowButton2 />
      </button>

      {isVisible && (
        <>
          <div
            className="fixed inset-0 bg-neutral-900/60 z-40"
            onClick={handleCloseMenu}
          />
          <div
            className="fixed top-[15%] left-0 right-0 z-50 bg-white dark:bg-neutral-950 shadow-lg ring-1 ring-black/5 overflow-y-auto"
            style={{ height: "70vh" }}
          >
            <div className="container relative w-full h-full py-10">
              <div className="hiddenScrollbar overflow-y-auto py-5">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-2">
                    <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                      Starter Sites
                    </h4>
                    <div className="space-y-2 text-neutral-500 dark:text-neutral-300">
                      {footerLinks.slice(0, 3).map((link) => (
                        <div key={link.name} className="text-sm">
                          <a href={link.href} className="hover:underline">
                            {link.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="mb-2 font-medium text-gray-800 dark:text-white">
                      Collections
                    </h4>
                    <div className="space-y-2 text-neutral-500 dark:text-neutral-300">
                      {footerLinks.slice(3).map((link) => (
                        <div key={link.name} className="text-sm">
                          <a href={link.href} className="hover:underline">
                            {link.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="relative aspect-[8/5] overflow-hidden rounded-md p-6">
                      <div className="absolute left-0 top-0 w-full h-full">
                        <img
                          src={banner2}
                          alt="Tech Banner"
                          className="object-cover object-center w-full h-full transition-transform duration-700 transform scale-105 hover:scale-100"
                        />
                      </div>
                      <div className="relative z-20 flex flex-col justify-center h-full p-6  bg-opacity-70 dark:bg-neutral-900 dark:bg-opacity-70">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          Stay Ahead with Our New Tech
                        </h4>
                        <div className="mt-8">
                          <p className="mb-3">
                            from:{" "}
                            <span className="text-lg font-semibold text-primary dark:text-white">
                              $15
                            </span>
                          </p>
                          <button className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="relative aspect-[8/5] overflow-hidden rounded-md p-6">
                      <div className="absolute left-0 top-0 w-full h-full">
                        <img
                          src={banner1}
                          alt="Speakers Banner"
                          className="object-cover object-center w-full h-full transition-transform duration-700 transform scale-105 hover:scale-100"
                        />
                      </div>
                      <div className="relative z-20 flex flex-col justify-center h-full p-6  bg-opacity-70 dark:bg-neutral-900 dark:bg-opacity-70">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          Check Out for New Speakers
                        </h4>
                        <div className="mt-8">
                          <p className="mb-3">
                            from:{" "}
                            <span className="text-lg font-semibold text-primary dark:text-white">
                              $15
                            </span>
                          </p>
                          <button className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogBar;
