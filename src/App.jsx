import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModeSelect from "./pages/ModeSelect";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";              // ✅ storm mode + name drop
import RoastRumble from "./pages/RoastRumble";
import MindMeld from "./pages/MindMeld";
import Results from "./pages/Results";
import HowToPlay from "./pages/HowToPlay";
import Settings from "./pages/Settings";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mode" element={<ModeSelect />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/play" element={<Play />} /> {/* Storm Mode */}
        <Route path="/roast-rumble" element={<RoastRumble />} />
         <Route path="/mind-meld" element={<RoastRumble />} />
        

        <Route path="/play" element={<Play />} /> {/* storm mode */}
        <Route path="/play/name-drop" element={<Play />} /> {/* name drop */}
        <Route path="/play/roast-rumble" element={<RoastRumble />} />
        <Route path="/play/mind-meld" element={<MindMeld />} />


        <Route path="/results" element={<Results />} />

        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </Router>
  );
}

export default App;
