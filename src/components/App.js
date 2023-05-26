import { HashRouter, Routes, Route } from "react-router-dom";
import '../styles/App.css';
import Nav from './Nav';
import Home from './Home';
import Leaderboard from "./Leaderboard";

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
