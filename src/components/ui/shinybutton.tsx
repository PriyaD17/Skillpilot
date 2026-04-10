import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ text, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {text}
      </span>
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
    </motion.button>
  );
};
