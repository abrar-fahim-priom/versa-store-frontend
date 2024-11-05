import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-lg text-white ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-coral-500 dark:focus:border-coral-400 ${className}`}
    {...props}
  />
);

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-neutral-100 text-black dark:bg-gray dark:text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-6  border-t border-neutral-500 dark:border-neutral-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white  dark:bg-gray-800 p-3 rounded-lg">
              <FaPaperPlane className="h-6 w-6 text-slate-950 dark:text-gray-300" />
            </div>
            <div>
              <h3 className="text-coral-500 text-xl font-semibold">
                Subscribe To Our Newsletter
              </h3>
              <p className="dark:text-slate-300 text-gray">
                Get all the latest information on Events, Sales, and Offers.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-auto flex gap-2">
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-white text-slate-950 dark:bg-gray-800 dark:text-gray-300 min-w-[300px]"
              required
            />
            <Button
              type="submit"
              className="bg-coral-500 hover:bg-coral-600 dark:bg-coral-600 dark:hover:bg-coral-500"
            >
              <FaPaperPlane className="h-4 w-4 text-black dark:text-white" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div>
            <h4 className="text-coral-500 font-semibold mb-4">ABOUT US</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Regarding Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="profile/orders"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Column */}
          <div>
            <h4 className="text-coral-500 font-semibold mb-4">POLICY</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Point Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-coral-500 font-semibold mb-4">HELP</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Used Device
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-coral-500 dark:hover:text-coral-400"
                >
                  Announcement
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div>
            <h4 className="text-coral-500 font-semibold mb-4">
              STAY CONNECTED
            </h4>
            <h5 className="font-semibold mb-2">VersaStore</h5>
            <p className="text-black dark:text-white dark:text-gray-400 mb-2">
              contact@versaStore.com
            </p>
            <p className="text-black dark:text-white mb-4">09678-664664</p>
            <div className="flex gap-4">
              <Link
                to="/about"
                className="hover:text-coral-500 dark:hover:text-coral-400"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="hover:text-coral-500 dark:hover:text-coral-400"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="hover:text-coral-500 dark:hover:text-coral-400"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="hover:text-coral-500 dark:hover:text-coral-400"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="hover:text-coral-500 dark:hover:text-coral-400"
              >
                <FaTwitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
