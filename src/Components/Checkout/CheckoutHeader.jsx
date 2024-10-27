import { Link } from "react-router-dom";

import Logo from "../../assets/versaStore-logo.png";
import CartSideBar from "../Header/CartSideBar";

const CheckoutHeader = () => {
  return (
    <nav className="border-b border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900">
      <div className="container">
        <div className="flex items-center justify-between py-5">
          {" "}
          <Link to="/" className="flex cursor-pointer items-center gap-1">
            <img src={Logo} className="w-8" alt="" />
            <span className={`text-2xl font-bold dark:text-white`}>
              VersaStore
            </span>
          </Link>
          <div>
            <CartSideBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutHeader;
