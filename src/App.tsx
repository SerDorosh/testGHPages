import "./App.css";
import { NearPanel } from "./component/Near/NearPanel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <NearPanel />
      </header>
    </div>
  );
}

export default App;
