import { useState } from "react";

const ImageShowCase = ({ shots }) => {
  if (!shots || shots.length === 0) {
    return <div>No images available</div>;
  }
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="grid grid-cols-6 gap-3 border-neutral-300 p-2 xl:gap-8">
      {/* Left side - Thumbnails */}
      <div className="order-2 col-span-6 w-full items-center lg:order-1 lg:col-span-1 lg:flex">
        <div className="grid grid-cols-6 gap-3">
          {shots.slice(0, 4).map((shot, index) => (
            <div
              key={index}
              className={`${
                activeImageIndex === index ? "border-2 border-primary" : ""
              } relative col-span-2 aspect-square overflow-hidden rounded-lg md:col-span-2 lg:col-span-6 lg:h-[100px] xl:h-auto xl:w-full`}
            >
              <button
                className="w-full h-full"
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={shot}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-contain object-center"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Active Image */}
      <div className="order-1 col-span-6 lg:order-2 lg:col-span-5">
        <div className="relative overflow-hidden rounded-2xl lg:h-[520px] xl:h-auto xl:w-full">
          <img
            src={shots[activeImageIndex]}
            alt={`Active image`}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageShowCase;
