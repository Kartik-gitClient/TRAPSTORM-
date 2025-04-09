import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import roastRumbleData from "./data/Data.json"; // ✅ Import Roast Rumble JSON
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const roastDebates = roastRumbleData.roastRumble; // ✅ Use JSON data

function RoastRumble() {
  const {
    players,
    currentPlayerIndex,
    roundNumber,
    addScore,
    nextTurn,
    mode,
    currentCategoryIndex,
    nextCategory,
    categories,
  } = useGame();

  const navigate = useNavigate();
  const currentPlayer = players[currentPlayerIndex];
  const currentCategoryName = categories[currentCategoryIndex] || "Roast Rumble";

  const [debate, setDebate] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklist, setChecklist] = useState({
    performed: false,
    onTopic: false,
    effort: false,
    refused: false,
  });

  useEffect(() => {
    const random = roastDebates[Math.floor(Math.random() * roastDebates.length)];
    setDebate(random);
    setShowChecklist(false);
    setChecklist({
      performed: false,
      onTopic: false,
      effort: false,
      refused: false,
    });
  }, [currentPlayerIndex, roundNumber]);

  const handleChecklistChange = (key) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleVote = (type) => {
    addScore(currentPlayer, type);
    const isLastPlayer = currentPlayerIndex === players.length - 1;
    const isLastRound = roundNumber >= 3;

    if (isLastPlayer && isLastRound) {
      if (mode === "storm") {
        nextCategory(navigate); // 🔥 Move to next category in storm mode
      } else {
        navigate("/results"); // Normal mode
      }
    } else {
      nextTurn();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6">
      {/* Category and Mode Information */}
      <motion.div
        className="text-sm mb-3 bg-white text-black px-3 py-1 rounded-full shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: 🔥 ROAST RUMBLE
      </motion.div>

      {/* Title and Round Information */}
      <motion.h2
        className="text-3xl font-bold mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🔥 Roast Rumble
      </motion.h2>
      <motion.h3
        className="text-xl mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Round {roundNumber}
      </motion.h3>
      <motion.h4
        className="text-2xl font-semibold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {currentPlayer}'s Debate
      </motion.h4>

      {/* Debate Text Box */}
      <motion.div
        className="bg-purple-600 text-white p-4 rounded-lg shadow-lg mb-6 max-w-md w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xl font-bold">{debate}</p>
      </motion.div>

      {/* Judge Performance Button */}
      {!showChecklist && (
        <motion.button
          className="bg-white text-purple-800 font-semibold px-6 py-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
          onClick={() => setShowChecklist(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ✅ Judge Performance
        </motion.button>
      )}

      {/* Checklist Section */}
      {showChecklist && (
        <>
          <motion.div
            className="bg-white text-purple-800 font-semibold px-6 py-4 w-2/3 my-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-lg font-bold mb-3">Judge Checklist:</p>
            {Object.entries(checklist).map(([key, value]) => (
              <label key={key} className="block mb-2 capitalize">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleChecklistChange(key)}
                  className="mr-2"
                />
                {key}
              </label>
            ))}
          </motion.div>

          {/* Vote Buttons */}
          <div className="flex gap-4">
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl w-2/3 text-xl shadow-xl"
              onClick={() => handleVote("rope")}
              disabled={checklist.refused}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              ✅ Rope (Passed)
            </motion.button>
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl w-2/3 text-xl shadow-xl"
              onClick={() => handleVote("trap")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              ❌ Trap (Failed)
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default RoastRumble;
