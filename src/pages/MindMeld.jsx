import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import mindMeldData from "./data/Data.json"; // ✅ Import Mind Meld JSON
import { motion } from "framer-motion"; // Import Framer Motion

const mindMeldCategories = mindMeldData.MindMeldCategories; // ✅ Use the entire categories object

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
    // Get a random category
    const categoryKeys = Object.keys(mindMeldCategories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    setCategory(randomCategory);

    // Pick a random word from the selected category
    const randomWord = mindMeldCategories[randomCategory][Math.floor(Math.random() * mindMeldCategories[randomCategory].length)];
    setWord(randomWord);

    // Reset timer and isTimeUp
    setTimeLeft(60);
    setIsTimeUp(false);

    // Timer countdown
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
      if (mode === "storm") {
        nextCategory(navigate); // 🌪️ Go to next category in storm mode
      } else {
        navigate("/results"); // 🎮 Normal Mode
      }
    } else {
      nextTurn(); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6">
      <div className="flex flex-col items-center justify-center mt-20 text-lg mb-3 bg-white text-black px-3 py-1 rounded-lg shadow">
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: 🧠 Mind Meld
      </div>

      <h2 className="text-2xl mt-5 mb-2">🧠 Mind Meld - Round {roundNumber}</h2>
      <h3 className="text-2xl font-bold mb-6">{currentPlayer}'s Turn </h3>

      {/* Category and Word Animation */}
      <motion.div
        className="bg-white text-black text-center font-semibold px-6 my-3 py-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
        initial={{ opacity: 0, scale: 0.8 }} // Initial state: invisible and slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Animate to visible and normal size
        transition={{ duration: 1 }} // Duration of the fade and scale animation
      >
        <p className="text-3xl font-semibold">Category: {category}</p> {/* Display selected category */}
        <p className="text-4xl font-bold mt-2 text-purple-500">{word}</p> {/* Display selected word */}
        <p className="mt-4 text-lg text-sm ">Give clues without saying the word itself!</p>
      </motion.div>

      {/* Timer Animation */}
      <motion.div
        className="text-3xl font-mono mb-6"
        key={timeLeft} // Trigger re-render on time change
        initial={{ y: -20, opacity: 0 }} // Initial state: invisible and up
        animate={{ y: 0, opacity: 1 }} // Animate to visible and at the normal position
        transition={{ duration: 0.5 }} // Duration of the animation
      >
        ⏳ {timeLeft}s
      </motion.div>

      {isTimeUp && (
        <div className="flex gap-4">
          {/* Score Buttons with Animation */}
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            onClick={() => handleScore("rope")}
            whileHover={{ scale: 1.1 }} // Hover effect to scale up
            whileTap={{ scale: 0.95 }} // Tap effect to scale down
            transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
          >
            ✅ Guessed Correctly (Rope)
          </motion.button>
          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
            onClick={() => handleScore("trap")}
            whileHover={{ scale: 1.1 }} // Hover effect to scale up
            whileTap={{ scale: 0.95 }} // Tap effect to scale down
            transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
          >
            ❌ Couldn't Guess (Trap)
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default MindMeld;
