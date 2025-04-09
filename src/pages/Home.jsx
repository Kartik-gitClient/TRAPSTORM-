import { motion } from "framer-motion"; // Import Framer Motion
import Header from "../components/Header";

function Home() {
  return (
    <>
    <Header />
    <div className="min-h-screen w-full flex items-start justify-center bg-gradient-to-r from-purple-300 via-purple-600 to-purple-700 text-white p-6">
      <div className="text-center mt-10 space-y-8 px-4">
          {/* Main Heading with Animation */}
          <motion.h1
          className="text-6xl font-extrabold text-white drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }} // Start smaller and invisible
          animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
          transition={{ duration: 1.5, type: "spring", stiffness: 120 }} // Animation duration and type
        >
          Trapstorm
        </motion.h1>

        {/* Subtitle with Animation */}
        <motion.p
          className="text-2xl mt-20 text-gray-300 font-bold drop-shadow-lg"
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Fade in
          transition={{ delay: 0.5, duration: 1 }} // Fade duration and delay
        >
          The Ultimate Chaotic <br />
          Card Party Game
        </motion.p>

        {/* Start Game Button with Animation */}
        <motion.a
          href="/mode"
          className="inline-block mt-6 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400 transition-0.5s"
          whileHover={{ scale: 1.1 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down when clicked
          transition={{ type: "spring", stiffness: 300 }} // Smooth animation
        >
          Start Game
        </motion.a>
      </div>
    </div>
    </>
  );
}

export default Home;
