import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HowToPlay() {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className="min-h-screen flex flex-col justify-center text-black p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">🎮 How to Play Trapstorm</h1>

        <ul className="space-y-4 text-lg mb-10">
          <li>🔹 Select a game mode: <strong>Storm Mode</strong> (all categories) or <strong>Normal Mode</strong> (choose one).</li>
          <li>🔹 Add at least 2 players in the Lobby.</li>
          <li>🔹 Choose a category if you're playing Normal Mode.</li>
          <li>🔹 Each player gets their turn to complete a challenge.</li>
          <li>🔹 Others vote if the player gets a "Trap" or "Rope" based on their performance.</li>
          <li>🔹 View the final results after the rounds end.</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4">📚 Category Guide</h2>
        <ul className="text-lg space-y-3 mb-10">
          <li>💥 <strong>Name Drop:</strong> Name as many things as possible within the topic. Speed and creativity matter!</li>
          <li>🔥 <strong>Roast Rumble:</strong> Pick a side in a wild debate and go off! Stay on-topic and argue with flair.</li>
          <li>🧠 <strong>Mind Meld:</strong> One player gives clues, the others guess the secret word. No rhymes or direct words allowed!</li>
        </ul>

        <motion.button
      onClick={()=> navigate(-1)}
            
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg text-md text-center font-medium shadow-lg transition-all"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            UNDERSTOOD!
          </motion.button>

      </motion.div>

      
    </>
  );
}

export default HowToPlay;
