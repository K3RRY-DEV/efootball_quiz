import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home/Home.jsx";
import Quiz from "./Pages/Quiz/Quiz.jsx";
import QuestionSetup from "./Pages/QuestionSetUp/QuestionSetup.jsx";
import Loader from "./components/Loader.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
