import { AnimatePresence, motion } from "framer-motion";
import React from "react";
type Props = {
    shouldShow: boolean,
    label: string | undefined
}
export default function Tooltip(props:Props) {
    const { shouldShow, label } = props;
    if(!label) return null
  return (
    <AnimatePresence>
      {shouldShow ? (
        <div className="absolute -bottom-10 flex justify-center w-full">
          <motion.div
            className=" bg-white/10 backdrop-blur-xl px-4 py-1 rounded-md text-sm"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {label}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
