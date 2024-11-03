import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  FaChevronCircleLeft as ChevronLeftCircle,
  FaChevronCircleRight as ChevronRightCircle,
  FaPause as Pause,
  FaPlay as Play,
} from "react-icons/fa";
import slide1 from "../../images/new_arrival/Slider_1.webp";
import slide2 from "../../images/new_arrival/Slider_watch.webp";
import slide3 from "../../images/new_arrival/slider_laptop.webp";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const slides = [
    {
      id: 1,
      image: slide1,
      alt: "First slide",
      title: "Beautiful Nature",
      description: "Explore the wonders of nature",
    },
    {
      id: 2,
      image: slide2,
      alt: "Second slide",
      title: "Urban Life",
      description: "City views and architecture",
    },
    {
      id: 3,
      image: slide3,
      alt: "Third slide",
      title: "Adventure Time",
      description: "Discover new horizons",
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prevSlide) => {
      let nextSlide = prevSlide + newDirection;
      if (nextSlide >= slides.length) nextSlide = 0;
      if (nextSlide < 0) nextSlide = slides.length - 1;
      return nextSlide;
    });
  };

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative container w-full overflow-hidden mt-3 xl:mt-24 rounded-xl shadow-2xl bg-gray-900 mx-auto px-0 h-56 sm:h-64 md:h-72 lg:h-96 xl:h-[21rem]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative container w-full h-full">
            <img
              src={slides[currentSlide].image}
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt={slides[currentSlide].alt}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-sm sm:text-lg text-gray-200">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => paginate(-1)}
      >
        <ChevronLeftCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>
      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => paginate(1)}
      >
        <ChevronRightCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      <button
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        ) : (
          <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        )}
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
