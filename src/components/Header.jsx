import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, HelpCircle } from "lucide-react"; // Optional: nice icons

function Header() {
  return (
    <>
      <motion.header
        className="w-full flex justify-center items-center px-6 py-4 bg-purple-800 text-white shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex gap-2 items-center">
          <Link
            to="/how-to-play"
            className="bg-white flex items-center  text-purple-800 font-semibold px-6 py-2 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
          >
            <HelpCircle className="w-5 h-5 " />How to Play
          </Link>
          <Link
            to="/settings"
            className="bg-white flex items-center text-purple-800 font-semibold px-6 py-2 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

     

      </motion.header>
    </>
  );
}

export default Header;
