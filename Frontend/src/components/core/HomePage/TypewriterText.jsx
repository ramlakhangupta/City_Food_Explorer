// components/core/HomePage/TypewriterText.jsx
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";

const TypewriterText = () => {
  return (
    <motion.div
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.1 }}
      className="text-3xl lg:text-4xl font-bold text-center text-[#ffcf9f] font-nosifer mt-10"
    >
      <Typewriter
        words={[
          "Discover. Taste. Share. Repeat.",
          "Explore India's Local Flavours",
          "Your Food Adventure Starts Here 🍴"
        ]}
        loop={true}
        cursor
        cursorStyle="_"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </motion.div>
  );
};

export default TypewriterText;
