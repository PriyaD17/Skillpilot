import React from "react";
import { motion, Variants } from "motion/react";
import { ShinyButton } from "./ui/shinybutton";
import RadialPatternWithRadar from "./ui/radar";

interface LandingProps {
  onStart: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <motion.div
        className="z-10 flex flex-col items-center text-center max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-orange-500 drop-shadow-sm"
          variants={itemVariants}
        >
          Navigate Your Future with SkillPilot
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-gray-300 md:text-xl max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          Confused about your career after 10th or 12th? SkillPilot
          provides personalized guidance to help you discover the perfect
          path, courses, and exams in India.
        </motion.p>

        <motion.div variants={itemVariants} className="w-full max-w-lg mb-8">
            <RadialPatternWithRadar />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ShinyButton text="Get Started ✨" onClick={onStart} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
