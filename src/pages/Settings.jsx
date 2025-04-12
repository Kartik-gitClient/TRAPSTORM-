import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen bg-white text-black p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-6">⚙️ Settings</h1>

      <p className="text-lg mb-4">Settings page coming soon! You’ll be able to:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>🎨 Change game themes</li>
        <li>🔊 Toggle sound effects</li>
        <li>📏 Set custom round timers</li>
        <li>👥 Adjust number of rounds</li>
      </ul><br></br>

      <motion.button
        onClick={() => navigate(-1)}
        className="bg-black text-white font-semibold p-2 rounded-xl shadow-lg hover:bg-gray-700 transition"
        whileHover={{ scale: 1.05 }}
      >
        🔙 Back
      </motion.button>
    </motion.div>
    
  );
}

export default Settings;
