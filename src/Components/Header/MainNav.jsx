import debounce from "lodash/debounce";
import React, { useEffect, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import versaStoreLogo from "../../assets/versaStore-logo.png";
import { useSearchProductsQuery } from "../../store/api/productApi";
import Darkmode from "../ui/Darkmode";
import CartSideBar from "./CartSideBar";
import CatalogBar from "./CatalogBar";
import MenuBar from "./MenuBar";
import UserAccount from "./UserAccount";

const navLinks = [
  { id: "1", href: "/home", name: "Home" },
  { id: "2", href: "/profile/orders", name: "My Orders" },
  { id: "3", href: "/contact", name: "Contact" },
];

const Input = ({ type, className, placeholder, value, onChange }) => (
  <input
    type={type}
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Logo = () => (
  <Link className="flex cursor-pointer items-center gap-1" to="/">
    <img src={versaStoreLogo} className="w-10" alt="" />
    <span className={`text-2xl font-bold dark:text-white`}>VersaStore</span>
  </Link>
);

const SearchDropdown = ({
  products,
  isLoading,
  isVisible,
  onClose,
  onProductClick,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="p-4 flex flex-row flex-wrap gap-4 justify-center">
        {isLoading ? (
          <div className="text-center text-neutral-500">Searching...</div>
        ) : products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-start gap-4 w-full hover:border-indigo-400 hover:rounded hover:border p-4 cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <img
                src={product.images && product.images[0]?.url}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-green-600">{product.price.toFixed(2)} ৳</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-neutral-500">No products found</div>
        )}
      </div>
    </div>
  );
};

const MainNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const debouncedSearchTerm = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const {
    data: products,
    isLoading,
    error,
  } = useSearchProductsQuery(searchTerm || "", {
    skip: !searchTerm || searchTerm.length < 2, // Avoid unnecessary requests
  });

  const handleSearchChange = (e) => {
    const value = e.target.value.trim(); // Remove unnecessary whitespace
    if (value.length >= 2) {
      debouncedSearchTerm(value);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleProductClick = (product) => {
    setShowResults(false);
    navigate(`/products/${product._id}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-6 py-3 lg:py-4">
        <div className="xl:hidden flex flex-row items-center">
          <MenuBar />
        </div>
        <div className="relative flex items-center gap-5 xl:grow">
          <Logo />
          <CatalogBar className="hidden xl:inline-block" />
          <div className="hidden  xl:block">
            <div ref={searchRef} className="relative ">
              <div className="flex items-center gap-2 rounded border-2 border-primary/15 bg-white pr-2 transition-all duration-300 hover:border-primary dark:border-white/15 dark:bg-neutral-950">
                <Input
                  type="text"
                  className="flex-grow w-full border-transparent dark:bg-neutral-950 placeholder:text-neutral-500 focus:border-transparent py-2 px-3"
                  placeholder="What are you looking for ..."
                  onChange={handleSearchChange}
                />
                <RiSearch2Line className="text-2xl dark:text-neutral-500 text-neutral-500" />
              </div>
              <SearchDropdown
                products={products}
                isLoading={isLoading}
                isVisible={showResults}
                onClose={() => setShowResults(false)}
                onProductClick={handleProductClick}
              />
            </div>
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
                  <NavLink to={navItem.href}>{navItem.name}</NavLink>
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
        <div ref={searchRef} className="relative">
          <div className="flex items-center border border-neutral-300 bg-white pr-3 dark:bg-neutral-950">
            <Input
              type="text"
              className="flex-grow border-transparent placeholder:text-neutral-500 focus:border-transparent py-2 px-3"
              placeholder="What are you looking for ..."
              onChange={handleSearchChange}
            />
            <RiSearch2Line className="text-2xl text-neutral-500 ml-2" />
          </div>
          <SearchDropdown
            products={products}
            isLoading={isLoading}
            isVisible={showResults}
            onClose={() => setShowResults(false)}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
