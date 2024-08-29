import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";

// Placeholder product data
const products = [
  {
    name: "Product 1",
    coverImage: "https://via.placeholder.com/150",
    currentPrice: 299,
    slug: "product-1",
  },
  {
    name: "Product 2",
    coverImage: "https://via.placeholder.com/150",
    currentPrice: 298,
    slug: "product-2",
  },
];

const CartSideBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  // InputNumber component directly integrated here
  const InputNumber = ({
    className = "w-fit",
    defaultValue = 1,
    min = 1,
    max = 99,
    onChange,
    label,
    desc,
  }) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const handleClickDecrement = () => {
      if (min >= value) return;
      setValue((state) => state - 1);
      onChange && onChange(value - 1);
    };

    const handleClickIncrement = () => {
      if (max && max <= value) return;
      setValue((state) => state + 1);
      onChange && onChange(value + 1);
    };

    return (
      <div
        className={`nc-InputNumber border-2 rounded-md border-primary/15 dark:border-neutral-500 flex items-center justify-between space-x-5 ${className}`}
      >
        {label && (
          <div className="flex flex-col">
            <span className="font-medium">{label}</span>
            {desc && (
              <span className="text-xs font-normal text-neutral-500">
                {desc}
              </span>
            )}
          </div>
        )}
        <div className="nc-NcInputNumber__content text-primary dark:text-neutral-100 flex w-[104px] items-center justify-between">
          <button
            className="flex h-8 w-8 items-center justify-center text-xl focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
            type="button"
            onClick={handleClickDecrement}
            disabled={min >= value}
          >
            -
          </button>
          <span className="block w-6 select-none text-center leading-none">
            {value}
          </span>
          <button
            className="flex h-8 w-8 items-center justify-center text-xl focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
            type="button"
            onClick={handleClickIncrement}
            disabled={max ? max <= value : false}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="relative mx-5 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span className="absolute -top-1/4 left-3/4 inline-block aspect-square size-4 rounded-full bg-primary text-[10px] text-white">
          3
        </span>
        <CiShoppingCart size={24} />
      </button>

      <>
        <div
          className={`fixed inset-0 bg-neutral-900/60 z-40 transition-opacity ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleCloseMenu}
        />

        <div
          className={`fixed inset-y-0 right-0 w-full max-w-md md:max-w-[486px] z-50 transition-transform duration-300 transform ${
            isVisible ? "translate-x-0" : "translate-x-full"
          } bg-white dark:bg-gray shadow-lg ring-1 ring-black/5`}
        >
          <div className="relative h-full rounded-md">
            <div className="hiddenScrollbar h-full overflow-y-auto p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-4xl font-semibold">
                  Cart <span className="text-sm font-normal">2 items</span>
                </h3>
                <button onClick={handleCloseMenu} className="p-2">
                  <MdClose className="text-2xl" />
                </button>
              </div>
              <div className="divide-y divide-neutral-300">
                {products.slice(0, 2).map((item) => (
                  <div key={item.name} className="flex gap-5 py-5 last:pb-0">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item.coverImage}
                        alt={item.name}
                        className="size-full object-contain object-center"
                      />
                      <a
                        onClick={handleCloseMenu}
                        className="absolute inset-0"
                        href={`/products/${item.slug}`}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="line-clamp-1 text-ellipsis font-medium">
                            <a
                              onClick={handleCloseMenu}
                              href={`/products/${item.slug}`}
                            >
                              {item.name}
                            </a>
                          </h3>
                          <span className="font-medium">
                            ${item.currentPrice}
                          </span>
                        </div>
                        <InputNumber
                          min={1}
                          max={10}
                          defaultValue={1}
                          className="h-10"
                        />
                      </div>
                      <div className="flex w-full items-end justify-between text-sm">
                        <div>
                          <span className="text-gray">storage: 128GB</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a className="underline" href="/">
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="bg-neutral-100 p-6 dark:bg-neutral-800">
                <span className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>$597</span>
                </span>
                <p className="block w-2/3 text-sm text-neutral-500">
                  Tax included and Shipping and taxes calculated at checkout.
                </p>
              </div>
              <div className="mt-5 flex flex-col items-center gap-4">
                <a
                  onClick={handleCloseMenu}
                  className="w-full bg-primary text-white p-3 rounded-md text-center"
                  href="/checkout"
                >
                  Checkout
                </a>
                <ButtonSecondary
                  onClick={handleCloseMenu}
                  href="/cart"
                  className="w-fit text-center"
                >
                  View cart
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CartSideBar;
