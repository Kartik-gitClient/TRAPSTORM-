import { motion } from "framer-motion";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white text-gray-800 mt-15 px-6 pt-5">
        <div className="text-center w-full max-w-3xl space-y-12">

          {/* Main Title */}
          <motion.h1
            className="text-6xl sm:text-7xl font-bold mt-10  tracking-tight text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 120 }}
          >
            Trapstorm
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-500 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            The ultimate chaotic <span className="text-gray-700 font-bold">card party game</span> to break friendships & make memories.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="/mode"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Start Game
          </motion.a>
        </div>
      </div>
    </>
  );
}

export default Home;
