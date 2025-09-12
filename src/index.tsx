import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
import { ThankYou } from "./components/ThankYou";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/rahmat" element={<ThankYou />} />
      </Routes>
    </Router>
  </StrictMode>,
);
