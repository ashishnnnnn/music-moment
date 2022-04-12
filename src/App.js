import "./App.css";
import { Navbar, Sidebar } from "./Components";
import { Home } from "./Pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
