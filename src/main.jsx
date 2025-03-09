import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import { ScrollToTopOnNewPage } from "./components/ScrollToTopOnNewPage";
import "./i18n";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTopOnNewPage />
      <App />
    </Router>
  </StrictMode>,
)
