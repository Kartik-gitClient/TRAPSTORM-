import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../context/GameContext";
import { motion } from "framer-motion";

function Lobby() {
  const [players, setPlayers] = useState([""]);
  const navigate = useNavigate();
  const { addPlayers, mode, setSelectedCategory } = useGame();
  const [selected, setSelected] = useState("Name Drop");

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

    if (validPlayers.length < 2 || validPlayers.length >= 8 ) {
      alert("ENTER VALID PLAYER LENGTH  TO PROCEED MIN(2) MAX(8)");
      navigate("/mode");
      return;
    }
    const hasDuplicates = new Set(validPlayers.map(p => p.trim().toLowerCase())).size !== validPlayers.length;

    if (hasDuplicates) {
      alert("ENTER APPROPRIATE AND DISTINGUISHED NAMES");
      navigate("/mode");
      return;
    }

    addPlayers(validPlayers);
    setSelectedCategory(selected);

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
        className="h-screen flex flex-col justify-start items-center bg-white text-black p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl font-extrabold drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 120 }}
        >
          Trapstorm
        </motion.h1>

        <h2 className="text-5xl font-bold mt-10 mb-4">👥 Lobby 👥</h2>
        <p className="mb-4 text-lg text-gray-500">Add players and get ready to Trapstorm!</p>

        {/* Category Select (if normal mode) */}
        {mode === "normal" && (
          <motion.div
            className="mb-6 w-full max-w-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <label className="block mb-2 font-semibold">🎯 Choose Category</label>
            <select
              className="w-full p-3 rounded-xl bg-gray-100 text-black border border-gray-300 shadow-inner"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="Name Drop">Name Drop</option>
              <option value="Roast Rumble">Roast Rumble</option>
              <option value="Mind Meld">Mind Meld</option>
            </select>
          </motion.div>
        )}

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
              className="w-full p-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 border border-gray-300"
              placeholder={`Player ${i + 1} name`}
              value={name}
              onChange={(e) => handleChange(i, e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}

          <motion.button
            className="w-full bg-black text-white font-semibold px-6 py-4 rounded-2xl shadow hover:bg-gray-900 transition"
            onClick={addPlayer}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ➕ Add Player
          </motion.button>
        </motion.div>

        {/* Start Game Button */}
        <motion.button
          className="bg-black text-white font-semibold px-6 py-4 border-2 border-black rounded-2xl hover:bg-gray-900 transition"
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
