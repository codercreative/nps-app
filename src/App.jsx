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
  const [parks, setParks] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");

  const baseURL = "https://developer.nps.gov/api/v1";

  const endpoint = {
    parks: `${baseURL}/parks`,
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${endpoint.parks}?parkCode=yose`, {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      });
      const json = await result.json();
      console.log(json);
      setParks(json.data);
    };
    fetchData();
  }, []);

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
