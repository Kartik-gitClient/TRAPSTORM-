import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import mindMeldData from "./data/Data.json";
import { motion } from "framer-motion";

const mindMeldCategories = mindMeldData.MindMeldCategories;

function MindMeld() {
  const {
    players,
    currentPlayerIndex,
    roundNumber,
    addScore,
    nextTurn,
    mode,
    currentCategoryIndex,
    nextCategory,
  } = useGame();

  const navigate = useNavigate();
  const currentPlayer = players[currentPlayerIndex];
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const categoryKeys = Object.keys(mindMeldCategories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    setCategory(randomCategory);

    const randomWord = mindMeldCategories[randomCategory][Math.floor(Math.random() * mindMeldCategories[randomCategory].length)];
    setWord(randomWord);

    setTimeLeft(60);
    setIsTimeUp(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayerIndex, roundNumber]);

  const handleScore = (type) => {
    addScore(currentPlayer, type);

    const isLastPlayer = currentPlayerIndex === players.length - 1;
    const isLastRound = roundNumber >= 3;

    if (isLastPlayer && isLastRound) {
      mode === "storm" ? nextCategory(navigate) : navigate("/results");
    } else {
      nextTurn();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black p-6">
      {/* Mode and Category Info */}
      <motion.div
        className="text-lg mb-3 mt-10 bg-black text-white px-3 py-1 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: 🧠 Mind Meld
      </motion.div>

      {/* Headers */}
      <h2 className="text-2xl mt-5 mb-2 font-bold">🧠 Mind Meld - Round {roundNumber}</h2>
      <h3 className="text-2xl font-bold mb-6">{currentPlayer}'s Turn</h3>

      {/* Card with category + word */}
      <motion.div
        className="bg-gray-200 text-black text-center font-semibold px-6 my-3 py-5 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-2xl font-semibold">Category: {category}</p>
        <p className="text-3xl font-bold mt-3">{word}</p>
        <p className="mt-4 text-sm text-gray-500">Give clues without saying the word itself!</p>
      </motion.div>

      {/* Timer */}
      <motion.div
        className="text-4xl font-mono mb-6"
        key={timeLeft}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ⏳ {timeLeft}s
      </motion.div>

      {/* Score buttons */}
      {isTimeUp && (
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition"
            onClick={() => handleScore("rope")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✅ Guessed Correctly (Rope)
          </motion.button>
          <motion.button
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-red-700 transition"
            onClick={() => handleScore("trap")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❌ Couldn't Guess (Trap)
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default MindMeld;
