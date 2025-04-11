import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import nameDropData from "./data/Data.json";
import { motion } from "framer-motion";

const nameDropChallenges = nameDropData.nameDrop;

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

    if (mode === "normal") {
      if (isLastPlayer && isLastRound) {
        navigate("/results");
      } else {
        nextTurn();
      }
    } else {
      if (isLastPlayer && isLastRound) {
        nextCategory(navigate);
      } else {
        nextTurn();
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-start items-center bg-white text-black p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-lg mb-3 mt-10 bg-black text-white px-3 py-1 rounded-lg shadow">
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: NAME DROP
      </div>

      <motion.h2
        className="text-3xl mb-4 mt-10 drop-shadow-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🔥 Round {roundNumber} 🔥
      </motion.h2>

      <motion.h3
        className="text-5xl font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {currentPlayer}'s Turn
      </motion.h3>

      {nextPlayer && (
        <motion.h4
          className="text-xl font-semibold mb-6 text-gray-500"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          👤 Next up: {nextPlayer}
        </motion.h4>
      )}

      <motion.div
        className="bg-gray-100 p-6 rounded-xl shadow-md mb-6 w-full max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.p
          className="text-2xl font-medium"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {challenge}
        </motion.p>
      </motion.div>

      <motion.div
        className="text-3xl font-mono mb-6"
        key={timeLeft}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ⏳ {timeLeft}s
      </motion.div>

      {isTimeUp && (
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl w-full text-xl shadow-xl"
            onClick={() => handleScore("rope")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            ✅ Rope (Correct)
          </motion.button>

          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl w-full text-xl shadow-xl"
            onClick={() => handleScore("trap")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 1 }}
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
