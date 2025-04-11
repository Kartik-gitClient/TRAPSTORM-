import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import Header from "../components/Header";

function ModeSelect() {
  const navigate = useNavigate();
  const { setMode } = useGame();

  const handleSelect = (mode) => {
    setMode(mode);
    navigate("/lobby");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black p-6">
        <motion.h1
          className="text-4xl font-extrabold text-black drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 120 }}
        >
          Trapstorm
        </motion.h1>

        <motion.h2
          className="text-4xl mt-30 font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          🎮 Choose Your Game Mode 🎮
        </motion.h2>

        <motion.div
          className="flex flex-col gap-6 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {/* Storm Mode Button */}
          <motion.button
            onClick={() => handleSelect("storm")}
            className="bg-white text-black font-semibold px-6 py-4 rounded-2xl shadow-2xl transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🌩️ Storm Mode (Full Game)
          </motion.button>

          {/* Normal Mode Button */}
          <motion.button
            onClick={() => handleSelect("normal")}
            className="bg-black text-white font-semibold px-6 py-4 border-2 border-black rounded-2xl hover:bg-gray-900 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎯 Normal Mode (Play a Single Category)
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}

export default ModeSelect;
