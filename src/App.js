import "./App.css";
import { Navbar, Sidebar } from "./Components";
import {
  Home,
  Explore,
  Login,
  Signup,
  SingleVideoPage,
  LikedPage,
} from "./Pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/single-video/:video_id" element={<SingleVideoPage />} />
          <Route path="/liked" element={<LikedPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
