import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  heading: ReactNode;
  children: ReactNode;
  bgClassName?: string;
  headerHeight?: string;
}

const FramerAccordian: React.FC<IProps> = ({
  heading,
  children,
  bgClassName,
  headerHeight = "55px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className={`basic-setting border rounded overflow-hidden border-caramel ${bgClassName} `}
      animate={{
        height: isOpen ? "max-content" : "55px",
        transition: {
          duration: 0.5,
        },
      }}
    >
      <motion.div
        className="heading px-3 lg:px-6 py-4 border-0 border-b flex justify-between cursor-pointer"
        style={{ height: headerHeight }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {heading}
        <motion.div
          className="dropdown-btn"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <i className="fa fa-caret-down cursor-pointer" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {
          <motion.div className="content py-6 px-3 lg:px-6">
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
};

export default FramerAccordian;
