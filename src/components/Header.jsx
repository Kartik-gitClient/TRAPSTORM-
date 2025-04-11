import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, HelpCircle } from "lucide-react";

function Header() {
  return (
    <>
      <motion.header
        className="w-full flex justify-center items-center px-6 py-4 bg-white text-gray-900 border-b border-gray-200 shadow-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex gap-3 items-center">
          <motion.Link
            to="/how-to-play"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="inline-block bg-gray-900 text-center hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.Link>

          <motion.Link
            to="/settings"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="inline-block bg-gray-900 hover:bg-gray-800 text-center text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all"
          >
            <Settings className="w-5 h-5" />

          </motion.Link>
        </nav>
      </motion.header>
    </>
  );
}

export default Header;
