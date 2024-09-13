import "@glidejs/glide/dist/css/glide.core.min.css";

import Glide, {
  Breakpoints,
  Controls,
} from "@glidejs/glide/dist/glide.modular.esm";
import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { products } from "../../data/content";

import ProductCard from "./ProductCard";

const ProductSlider = ({ title, subText }) => {
  const glideRef = useRef(null);

  useEffect(() => {
    if (!glideRef.current) return;
    new Glide(glideRef.current, {
      type: "carousel",
      startAt: 0,
      gap: 6,
      perView: 4,
      bound: true,
      breakpoints: {
        800: { perView: 2 },
        500: { perView: 1 },
      },
    }).mount({ Controls, Breakpoints });
  }, []);

  return (
    <div className="mb-16 dark:text-white">
      <div ref={glideRef} className="glide">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subText && (
              <p className="mt-1 text-neutral-500 dark:text-neutral-300">
                {subText}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div
              className="glide__arrows flex items-center gap-2"
              data-glide-el="controls"
            >
              <button
                type="button"
                className="glide__arrow glide__arrow--left flex size-9 min-w-fit items-center justify-center rounded-full bg-white px-0 text-primary focus:ring-transparent disabled:bg-zinc-200/70"
                data-glide-dir="<"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className="glide__arrow glide__arrow--right flex size-9 min-w-fit items-center justify-center rounded-full bg-white px-0 text-primary focus:ring-transparent disabled:bg-zinc-200/70"
                data-glide-dir=">"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="glide__track mt-4" data-glide-el="track">
          <ul className="glide__slides">
            {products.map((product) => (
              <li key={product.name} className="glide__slide">
                <ProductCard className="w-full h-full" product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
