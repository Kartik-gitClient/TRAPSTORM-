import { motion } from "framer-motion"; // ✅ Import Framer Motion
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
            <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6">

                <motion.h1
                    className="text-6xl font-extrabold text-white drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }} // Start smaller and invisible
                    animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
                    transition={{ duration: 1.5, type: "spring", stiffness: 120 }} // Animation duration and type
                >
                    Trapstorm
                </motion.h1>

                <motion.h2
                    className="text-4xl mt-30  font-bold mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                >
                    🎮 Choose Your Game Mode 🎮
                </motion.h2>

                {/* Buttons Container Animation */}
                <motion.div
                    className="flex flex-col gap-6 w-full max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                >
                    {/* Storm Mode Button Animation */}
                    <motion.button
                        onClick={() => handleSelect("storm")}
                        className="bg-purple-700 text-white font-semibold px-6 py-4 rounded-2xl shadow-xl hover:bg-purple-800 transition"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        🌩️ Storm Mode (Full Game)
                    </motion.button>

                    {/* Normal Mode Button Animation */}
                    <motion.button
                        onClick={() => handleSelect("normal")}
                        className="bg-white text-purple-800 font-semibold px-6 py-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
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
