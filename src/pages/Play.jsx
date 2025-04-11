import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import nameDropData from "./data/Data.json"; // ✅ Import JSON
import { motion } from "framer-motion"; // Import Framer Motion

const nameDropChallenges = nameDropData.nameDrop; // ✅ Use JSON data

function Play() {
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
  const nextPlayer = players[currentPlayerIndex + 1];

  const [challenge, setChallenge] = useState("");
  const [timeLeft, setTimeLeft] = useState(35);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const randomChallenge = nameDropChallenges[Math.floor(Math.random() * nameDropChallenges.length)];
    setChallenge(randomChallenge);

    setTimeLeft(35);
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

    if (mode == "normal") {
      if (isLastPlayer && isLastRound) {
        navigate("/results"); // ✅ go to results only after last player
      } else {
        nextTurn(); // 👉 let the next player play
      }
    }

      if (isLastPlayer && isLastRound) {
        nextCategory(navigate); // 🌀 storm mode: switch category after all rounds
      } else {
        nextTurn();
    }

  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} // Animation duration
    >
      <div className="text-sm mb-3 mt-10 bg-white text-black px-3 py-1 rounded-full shadow">
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: NAME DROP
      </div>

      <motion.h2
        className="text-3xl mb-4 mt-10  drop-shadow-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🔥 Round {roundNumber}🔥
      </motion.h2>

      <motion.h3
        className="text-5xl font-bold mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {currentPlayer}'s Turn
      </motion.h3>

      <motion.h4
        className="text-3xl font-bold mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
       Next {nextPlayer}'s Turn
      </motion.h4>


      <motion.div
        className="bg-purple-800 p-6 rounded-xl shadow-lg mb-6 w-full max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.p
          className="text-2xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {challenge}
        </motion.p>
      </motion.div>
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
        <div className="flex flex-col gap-6 items-center">
          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl w-2/3 text-xl shadow-xl"
            onClick={() => handleScore("rope")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.5, delay: 0.8 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}

          >
            ✅ Rope (Correct)
          </motion.button>
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl w-2/3 text-xl shadow-xl"
            onClick={() => handleScore("trap")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.5, delay: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            ❌ Trap (Fail)
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default Play;
