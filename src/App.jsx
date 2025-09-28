//ok to use App.css instead of styled components or css module??

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import "./App.css";

import Header from "./shared/Header";
import Footer from "./shared/Footer";

import About from "./pages/About";
import Parks from "./pages/Parks";
import NotFound from "./pages/NotFound";

import FeaturedSection from "./components/FeaturedSection";

function App() {
  const [headerTitle, setHeaderTitle] = useState("");

  //=============== USE EFFECT ===============

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "US National Parks";
        setHeaderTitle("US National Parks");
        break;
      case "/about":
        document.title = "About";
        setHeaderTitle("About");
        break;
      case "/parks":
        document.title = "Parks";
        setHeaderTitle("Parks");
        break;
      default:
        document.title = "Not Found";
        setHeaderTitle("Not Found");
    }
  }, [location]);

  return (
    <div className="appContainer">
      <Header title={headerTitle} />
      <Routes>
        <Route path="/" element={<FeaturedSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/parks" element={<Parks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
