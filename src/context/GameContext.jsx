import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [scoreBoard, setScoreBoard] = useState({});
  const [mode, setMode] = useState("normal"); // "normal" or "storm"
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Name Drop"); 

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };


  const categories = ["name-drop", "roast-rumble", "mind-meld"];

  const addPlayers = (names) => {
    setPlayers(names);
    const initialScores = {};
    names.forEach((name) => {
      initialScores[name] = { rope: 0, trap: 0 };
    });
    setScoreBoard(initialScores);
  };

  const addScore = (player, type) => {
    setScoreBoard((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        [type]: prev[player][type] + 1,
      },
    }));
  };

  const nextTurn = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(0);
      setRoundNumber(roundNumber + 1);
    }
  };

  const resetGame = () => {
    setCurrentPlayerIndex(0);
    setRoundNumber(1);
    setScoreBoard({});
    setMode("normal");
    setCurrentCategoryIndex(0);
  };

  const nextCategory = (navigate) => {
    const isLastCategory = currentCategoryIndex >= categories.length - 1;

    if (!isLastCategory) {
      const nextIndex = currentCategoryIndex + 1;

      // 💥 Reset states BEFORE navigating
      setCurrentCategoryIndex(nextIndex);
      setRoundNumber(1);
      setCurrentPlayerIndex(0);

      // Give React a tick to apply state changes
      setTimeout(() => {
        navigate(`/${categories[nextIndex]}`);
      }, 50); // even 0ms can work, but 50ms gives some buffer
    } else {
      navigate("/results");
    }
  };


  return (
    <GameContext.Provider
      value={{
        players,
        addPlayers,
        scoreBoard,
        addScore,
        currentPlayerIndex,
        roundNumber,
        nextTurn,
        resetGame,
        mode,
        setMode,
        currentCategoryIndex,
        nextCategory,
        categories,
        selectedCategory, 
        setSelectedCategory
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
