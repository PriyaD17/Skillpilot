import React from "react";
import { motion } from "motion/react";

const RadialPatternWithRadar: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-64 md:h-80">
      {/* Radial circles */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute border border-orange-500/20 rounded-full"
            style={{
              width: `${i * 25}%`,
              height: `${i * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Radar sweep */}
      <motion.div
        className="absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-orange-500/20 to-transparent rounded-tl-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
        style={{
          top: "0",
          left: "0",
        }}
      />

      {/* Glowing center */}
      <div className="relative z-10 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]" />

      {/* Random blips */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-orange-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: i * 0.7,
          }}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
  );
};

export default RadialPatternWithRadar;
