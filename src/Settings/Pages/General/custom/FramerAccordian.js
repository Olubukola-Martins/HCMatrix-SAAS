import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FramerAccordian = ({ heading, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="basic-setting border rounded overflow-hidden"
      animate={{
        height: isOpen ? "max-content" : "55px",
        transition: {
          duration: 0.5,
        },
      }}
    >
      <motion.div
        className="heading px-6 py-4 border-0 border-b flex justify-between"
        style={{ height: "55px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-caramel text-xl font-semibold">{heading}</h5>
        <motion.div
          className="dropdown-btn"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <i className="fa fa-caret-down cursor-pointer"></i>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {<motion.div className="content p-6">{children}</motion.div>}
      </AnimatePresence>
    </motion.div>
  );
};

export default FramerAccordian;
