//ok to use App.css instead of styled components or css module??

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import About from "./pages/About";
import Parks from "./pages/Parks";
import NotFound from "./pages/NotFound";
import FeaturedSection from "./features/Home/FeaturedSection";
import SingleParkRoute from "./features/Parks/SingleParkRoute";

function App() {
  const [parks, setParks] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //=============== USE EFFECT ===============

  const baseURL = "https://developer.nps.gov/api/v1";
  const endpoint = {
    parks: `${baseURL}/parks`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${endpoint.parks}?limit=500`, {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      });
      const json = await result.json();
      console.log(json);
      setParks(json.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (true) {
      case path === "/":
        document.title = "US National Parks";
        setHeaderTitle("US National Parks");
        break;
      case path === "/about":
        document.title = "About";
        setHeaderTitle("About");
        break;
      case path === "/parks":
        document.title = "Parks";
        setHeaderTitle("Parks");
        break;
      case path.startsWith("/parks/"):
        setHeaderTitle("Park");
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
        <Route
          path="/parks"
          element={<Parks parks={parks} isLoading={isLoading} />}
        />
        <Route
          path="/parks/:parkCode"
          element={<SingleParkRoute parks={parks} />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
