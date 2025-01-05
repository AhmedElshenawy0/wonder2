"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
