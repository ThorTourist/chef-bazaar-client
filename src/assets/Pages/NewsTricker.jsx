import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const NewsTicker = () => {
  const controls = useAnimation();

  const headlines = [
    "🍲 Freshly Cooked Meals Added Daily",
    "👨‍🍳 Meet Verified Local Chefs Near You",
    "🔥 Up to 25% Off on Home-Cooked Specials",
    "🛵 Fast Delivery From Your Neighborhood Chefs",
    "🍛 Local Chef Bazar — Home Taste, Delivered",
  ];

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  const pauseAnimation = () => {
    controls.stop();
  };

  return (
    <div
      className="flex items-center cursor-pointer overflow-hidden h-12"
      onMouseEnter={pauseAnimation}
      onMouseLeave={startAnimation}
    >
      {/* Static Hot Deals Box */}
      <div className="flex items-center px-4 h-full font-bold text-yellow-300 text-lg flex-shrink-0 bg-purple-700">
        🔥 Hot Deals
      </div>

      {/* Scrolling Headlines */}
      <div
        className="flex-1 overflow-hidden h-full"
        style={{
          background: "linear-gradient(90deg, #ff416c, #ff4b2b, #ff416c)",
        }}
      >
        <motion.div
          className="flex whitespace-nowrap h-full items-center"
          initial={{ x: 0 }}
          animate={controls}
        >
          {[...headlines, ...headlines].map((item, idx) => (
            <span key={idx} className="px-8 text-white text-lg font-semibold">
              {item} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsTicker;
