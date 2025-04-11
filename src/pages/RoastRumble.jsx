import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import roastRumbleData from "./data/Data.json";
import { motion } from "framer-motion";

const roastDebates = roastRumbleData.roastRumble;

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
      mode === "storm" ? nextCategory(navigate) : navigate("/results");
    } else {
      nextTurn();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      {/* Mode + Category */}
      <motion.div
        className="text-lg mb-3 mt-10 bg-black text-white px-3 py-1 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {mode === "storm" ? "🌪️ Storm Mode" : "🎮 Normal Mode"} | Category: Roast Rumble
      </motion.div>

      {/* Titles */}
      <motion.h2 className="text-3xl font-bold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Roast Rumble
      </motion.h2>
      <motion.h3 className="text-sm mb-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Round {roundNumber}
      </motion.h3>
      <motion.h4 className="text-lg font-semibold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {currentPlayer}'s Debate
      </motion.h4>

      {/* Debate Box */}
      <motion.div
        className="bg-gray-100 text-black p-5 rounded-xl shadow-lg max-w-md w-full text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg font-bold">{debate}</p>
      </motion.div>

      {/* Judge Button */}
      {!showChecklist && (
        <motion.button
          className="border border-black text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
          onClick={() => setShowChecklist(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Judge Performance
        </motion.button>
      )}

      {/* Checklist */}
      {showChecklist && (
        <>
          <motion.div
            className="bg-gray-100 text-black font-semibold px-6 py-4 w-2/3 my-4 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
          <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl w-1/2 text-xl shadow-xl"
            onClick={() => handleVote("rope")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            ✅ Rope (Correct)
          </motion.button>

          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl w-1/2 text-xl shadow-xl"
            onClick={() => handleVote("trap")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            ❌ Trap (Fail)
          </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default RoastRumble;
