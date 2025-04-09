import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../context/GameContext";
import { motion } from "framer-motion"; // Import Framer Motion

function Lobby() {
  const [players, setPlayers] = useState([""]);
  const navigate = useNavigate();
  const { addPlayers, mode, setSelectedCategory } = useGame();
  const [selected, setSelected] = useState("Name Drop"); // local state to reflect UI

  const handleChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };


  const startGame = () => {
    const validPlayers = players.filter((p) => p.trim() !== "");

    if (validPlayers.length < 2 || validPlayers.length >=8 ) {
      alert("ENTER VALID PLAYER LENGTH TO PROCEED MIN(2) MAX(8)");
      navigate('/')
      return;
    }

    addPlayers(validPlayers);
    setSelectedCategory(selected); // ✅ properly store category in context

    // 🔥 Redirect based on mode
    if (mode === "storm") {
      navigate("/play");
    } else if (mode === "normal" && selected) {
      const path = `/play/${selected.toLowerCase().replace(/\s+/g, "-")}`;
      navigate(path);
    } else {
      alert("Please select a category first!");
    }
  };


  return (
    <>
      <Header />
      <motion.div
        className="h-screen flex flex-col justify-start items-center bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Main Heading with Animation */}
        <motion.h1
          className="text-6xl font-extrabold text-white drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }} // Start smaller and invisible
          animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
          transition={{ duration: 1.5, type: "spring", stiffness: 120 }} // Animation duration and type
        >
          Trapstorm
        </motion.h1>
        <h2 className="text-5xl font-bold mt-10 mb-4 drop-shadow-2xl">👥 Lobby👥 </h2>
        <p className="mb-4 text-lg text-purple-200">Add players and get ready to Trapstorm!</p>

        {/* 💥 New animated category selector */}

        {mode == 'normal' ?
        <motion.div
          className="mb-6 w-full max-w-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <label className="block mb-2 font-semibold text-white">🎯 Choose Category if (Normal Mode)</label>
          <select
            className="w-full p-3 rounded-xl bg-purple-100 text-purple-900 shadow-inner"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="Name Drop">Name Drop</option>
            <option value="Roast Rumble">Roast Rumble</option>
            <option value="Mind Meld">Mind Meld</option>
          </select>
        </motion.div> : console.log("PLAYING STORM MODE")
}

        {/* Player Inputs */}
        <motion.div
          className="w-full max-w-md space-y-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {players.map((name, i) => (
            <motion.input
              key={i}
              className="w-full p-3 rounded-lg bg-purple-100 text-purple-900 placeholder-purple-500"
              placeholder={`Player ${i + 1} name`}
              value={name}
              onChange={(e) => handleChange(i, e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
          <motion.button
            className="w-full bg-purple-700 text-white font-semibold px-6 py-4 rounded-2xl shadow-xl hover:bg-purple-800 transition"
            onClick={addPlayer}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ➕ Add Player
          </motion.button>
        </motion.div>

        {/* Start Game */}
        <motion.button
          className="bg-white text-purple-800 font-semibold px-6 py-4 border-2 border-purple-700 rounded-2xl hover:bg-purple-200 transition"
          onClick={startGame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          🚀 Start Game
        </motion.button>
      </motion.div>
    </>
  );
}

export default Lobby;
