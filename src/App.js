import "./App.css";
import { Navbar, Sidebar } from "./Components";
import { WebSiteRoutes } from "./WebSiteRoutes/WebSiteRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <WebSiteRoutes />
      </div>
    </div>
  );
}

export default App;
