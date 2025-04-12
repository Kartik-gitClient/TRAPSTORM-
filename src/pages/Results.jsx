import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Results() {
  const { players, scoreBoard } = useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate("/");
    window.location.reload();
  };

  const playerScores = players.map((player) => ({
    name: player,
    ...scoreBoard[player],
    total: scoreBoard[player]?.rope - scoreBoard[player]?.trap,
  }));

  const sortedPlayers = [...playerScores].sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen flex flex-col items-center text-center justify-center bg-white text-black p-6">
      <h1 className="text-4xl font-bold mb-6">Final Results</h1>

      {/* 🏁 Monochrome Podium */}
      <motion.div
        className="flex gap-6 items-end justify-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {sortedPlayers.slice(0, 3).map((player, index) => {
          const height = 100 + (2 - index) * 50;
          const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
          const textColors = ["#ffffff", "#ffffff", "#000000"];
          const place = ["🥇", "🥈", "🥉"][index];

          return (
            <motion.div
              key={player.name}
              className="flex flex-col justify-start items-center rounded-xl px-4 py-2"
              style={{
                backgroundColor: podiumColors[index],
                color: textColors[index],
                height: `${height}px`,
                width: "90px",
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 120 }}
            >
              <div className="text-2xl">{place}</div>
              <div className="font-bold">{player.name}</div>
              <div className="text-sm">{player.total} pts</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 📊 Scorecards */}
      <motion.div
        className="w-full max-w-md space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {players.map((player) => (
          <motion.div
            key={player}
            className="bg-gray-100 text-black p-4 rounded-xl shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-2">👤 {player}</h2>
            <p>✅ Ropes: {scoreBoard[player]?.rope || 0}</p>
            <p>❌ Traps: {scoreBoard[player]?.trap || 0}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔁 Play Again */}
      <motion.button
        onClick={handlePlayAgain}
        className="mt-10 border-2 border-black px-6 py-3 rounded-xl text-black font-semibold hover:bg-black hover:text-white transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        🔁 Play Again
      </motion.button>
    </div>
  );
}

export default Results;
