import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterProvider } from "./Context/FilterContext";
import { VideoListProvider } from "./Context/VideosContext";
import { ToastProvider } from "./Context/ToastContext";
import { AuthProvider } from "./Context/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ToastProvider>
          <FilterProvider>
            <VideoListProvider>
              <App />
            </VideoListProvider>
          </FilterProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
