import React from "react";

const ProductDescriptiontab = () => {
  return (
    <div className="">
      <details className="group dark:text-white">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5">
          <div className="space-x-6 group-open:text-primary dark:group-open:text-white">
            <span>Description</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="block size-5 group-open:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hidden size-5 group-open:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
        </summary>
        <div className=" pb-4 text-sm ">
          <h4 className="text-lg font-medium">The Ultimate Technology</h4>
          <p className="text-neutral-500 dark:text-neutral-300">
            {`Find a wide range of products to enhance your life. From headphones
            and phones to speakers, smart watches, gaming equipment, and
            laptops, we have everything you need to stay connected and
            entertained.`}{" "}
            <br />
            {`Our headphones are designed for exceptional sound quality, comfort,
            and style. Whether you prefer over-ear, on-ear, or in-ear
            headphones, we have options to suit your needs and budget.`}
          </p>
        </div>
      </details>
    </div>
  );
};

export default ProductDescriptiontab;
