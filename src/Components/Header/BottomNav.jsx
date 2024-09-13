import React from "react";
// import PhoneBar from "./PhoneBar";

const BottomNav = () => {
  // Placeholder navigation links
  const navLinks = [
    { id: 1, label: "Home", href: "#" },
    { id: 2, label: "Mobile", href: "#" },
    { id: 3, label: "Laptop", href: "#" },
    { id: 4, label: "Tablet", href: "#" },
    { id: 4, label: "Headphones", href: "#" },
    { id: 4, label: "Speakers", href: "#" },
    { id: 4, label: "Smart Watch", href: "#" },
  ];

  // Placeholder dropdown menu options
  const dropDownMenuOptions = [
    { href: "#", label: "Samsung" },
    { href: "#", label: "Apple" },

    { href: "#", label: "Xiaomi" },
  ];

  return (
    <div className="container relative">
      <div className="hidden border-t border-neutral-300 py-6 dark:border-neutral-600 xl:block">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-base font-semibold">
            {/* <PhoneBar /> */}

            {/* Example dropdown menu for 'Mobile' */}
            <div className="relative group">
              <button className="font-semibold text-neutral-700 dark:text-neutral-200">
                {navLinks[1].label}
              </button>
              <ul className="absolute left-0 hidden z-10 min-w-full bg-white border border-blue-500 px-2 py-4 shadow-lg dark:bg-neutral-800 group-hover:block">
                {dropDownMenuOptions.map((linkItem) => (
                  <li key={linkItem.label}>
                    <a
                      href={linkItem.href}
                      className="inline-block w-full dark:text-white px-3 py-2 font-medium hover:text-primary"
                    >
                      {linkItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other navigation links */}
            {navLinks.slice(2).map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="ml-6 font-semibold text-neutral-700 dark:text-neutral-200 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <p className="text-neutral-500 dark:text-neutral-200">
              Need help? Call Us:{" "}
              <span className="font-semibold text-black dark:text-white">
                +8801717856707
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
