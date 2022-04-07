import "./App.css";
import "./assets/fonts/robotomono.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Prerequisites } from "./components/Prerequisites";
import { TransactionSuccessPage } from "./components/TransactionSuccessPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prerequisites" element={<Prerequisites />} />
      <Route path="/transactions" element={<TransactionSuccessPage />} />
    </Routes>
  );
}

export default App;
