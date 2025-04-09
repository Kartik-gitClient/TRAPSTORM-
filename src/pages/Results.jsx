import { useGame } from "../context/GameContext"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

function Results() {
  const { players, scoreBoard } = useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate("/");
    window.location.reload(); // Hard reset the game state
  };

  // 🧠 Compute total scores and sort
  const playerScores = players.map((player) => ({
    name: player,
    ...scoreBoard[player],
    total: scoreBoard[player]?.rope - scoreBoard[player]?.trap, // Or just use rope count
  }));

  const sortedPlayers = [...playerScores].sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen flex flex-col items-center text-center justify-center bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Trapstorm Results</h1>

      {/* 🏆 Podium with Animations */}
      <motion.div
        className="flex gap-3 items-end justify-center mb-6"
        initial={{ opacity: 0 }} // Start invisible
        animate={{ opacity: 1 }} // Fade in the podium
        transition={{ duration: 1 }} // Fade duration
      >
        {sortedPlayers.slice(0, 3).map((player, index) => {
          const height = 100 + (2 - index) * 60;
          const place = ["🥇", "🥈", "🥉"][index];

          return (
            <motion.div
              key={player.name}
              className="flex flex-col  justify-start rounded-2xl px-4 py-2 shadow-lg"
              style={{
                backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                height: `${height}px`,
                width: "80px",
              }}
              initial={{ scale: 0.8 }} // Start smaller
              animate={{ scale: 1 }} // Animate to normal size
              transition={{ delay: index * 0.3, type: "spring", stiffness: 120 }} // Stagger animation for podium positions
            >
              <div className="text-3xl">{place}</div>
              <div className="text-xl font-bold">{player.name}</div>
              <div className="text-sm">{player.total} pts</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 📊 Full Score Breakdown with Animation */}
      <motion.div
        className="w-full max-w-md space-y-2"
        initial={{ opacity: 0 }} // Start invisible
        animate={{ opacity: 1 }} // Fade in the score breakdown
        transition={{ duration: 1 }} // Fade duration
      >
        {players.map((player) => (
          <motion.div
            key={player}
            className="bg-white text-purple-900 p-4 rounded-xl shadow-lg"
            initial={{ x: -100, opacity: 0 }} // Start from left and invisible
            animate={{ x: 0, opacity: 1 }} // Slide in and become visible
            transition={{ duration: 0.7 }} // Slide duration
          >
            <h2 className="text-2xl font-bold mb-2">👤 {player}</h2>
            <p>✅ Ropes: {scoreBoard[player]?.rope || 0}</p>
            <p>❌ Traps: {scoreBoard[player]?.trap || 0}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Play Again Button with Hover and Tap Animation */}
      <motion.button
        onClick={handlePlayAgain}
        className="bg-white text-purple-800 my-2 font-semibold px-6 py-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-100 transition"
        whileHover={{ scale: 1.1 }} // Scale up on hover
        whileTap={{ scale: 0.95 }} // Scale down when clicked
        transition={{ type: "spring", stiffness: 300 }} // Smooth animation
      >
        🔁 Play Again
      </motion.button>
    </div>
  );
}

export default Results;
