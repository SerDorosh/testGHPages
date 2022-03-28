import "./App.css";
import "./assets/fonts/robotomono.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Prerequisites } from "./components/Prerequisites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prerequisites" element={<Prerequisites />} />
    </Routes>
  );
}

export default App;
