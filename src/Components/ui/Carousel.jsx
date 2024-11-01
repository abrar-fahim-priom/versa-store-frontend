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
    }, // Fixed extra parenthesis here
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
    <div className="relative container w-full h-96 overflow-hidden rounded-xl shadow-2xl bg-gray-900">
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
          className="absolute w-full h-full"
        >
          <img
            src={slides[currentSlide].image}
            className="w-full h-full object-cover"
            alt={slides[currentSlide].alt}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

          {/* Slide Content */}
          <div className="absolute bottom-16 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-200">
              {slides[currentSlide].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => paginate(-1)}
      >
        <ChevronLeftCircle className="w-8 h-8 text-white" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => paginate(1)}
      >
        <ChevronRightCircle className="w-8 h-8 text-white" />
      </button>

      {/* Play/Pause Button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
