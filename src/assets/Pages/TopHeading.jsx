import React from "react";
import { motion } from "framer-motion";

const AnimatedHeading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-purple-700 py-3 text-center shadow-md"
    >
      <motion.h1
        className="text-2xl font-extrabold text-white tracking-wide"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="animate-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
          🍛 Local Chef Bazar — Home Taste, Delivered Fresh
        </span>
      </motion.h1>
    </motion.div>
  );
};

export default AnimatedHeading;
