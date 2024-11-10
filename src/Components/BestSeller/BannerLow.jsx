import { Link } from "react-router-dom";
import banner2 from "../../images/new_arrival/macbook.webp";

const BannerLow = () => {
  return (
    <div
      className="container flex flex-row relative w-full mb-3"
      style={{ aspectRatio: "820 / 312" }}
    >
      {/* Background image */}

      <div className="absolute rounded-md  bg-gray-400">
        <Link to="/categories/670564f65858fa34536cdefb">
          <img
            src={banner2}
            alt="Banner"
            className=" rounded-lg object-contain" // Use object-contain to maintain the full image within bounds
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerLow;
