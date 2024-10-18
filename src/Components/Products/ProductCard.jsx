import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, className, showPrevPrice = false }) => {
  const productImage = product.images && product.images[0]?.url;

  return (
    <Link
      to={`/products/${product._id}`}
      state={{ product }}
      className={`group inline-block h-full overflow-hidden rounded-md bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="">
        <div className="relative overflow-hidden">
          {product.discount > 0 && (
            <span className="absolute left-2 top-2 z-10 rounded-sm bg-green-700 px-2 text-sm font-bold text-white">
              Sale
            </span>
          )}
          <div className="relative aspect-square bg-white">
            <img
              src={productImage}
              alt={`${product.name} cover photo`}
              className="object-contain absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-2 w-full px-4 text-center transition-all duration-300 group-hover:bottom-2 lg:-bottom-full">
            <button className="w-full text-sm bg-primary text-white rounded-md py-3 hover:bg-primary/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
              Quick View
            </button>
          </div>
        </div>
        <div className="px-5 py-4">
          <span className="text-xs text-blue-500">STOCKMART</span>
          <h3 className="line-clamp-2 text-black dark:text-white text-ellipsis font-semibold">
            {product.name}
          </h3>
          {product.discount > 0 ? (
            <p>
              <span className="font-bold text-lg text-green-700">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>{" "}
              <span className="text-sm font-semibold text-neutral-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </p>
          ) : (
            <p className="font-bold text-green-700 text-lg">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
