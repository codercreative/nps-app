//ok to use App.css instead of styled components or css module??

import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import MyParks from "./pages/MyParks";
import Parks from "./pages/Parks";
import NotFound from "./pages/NotFound";
import FeaturedSection from "./features/Home/FeaturedSection";
import SinglePark from "./features/Parks/SinglePark";

const baseURL = "https://developer.nps.gov/api/v1";

const endpoint = {
  parks: `${baseURL}/parks`,
};

function App() {
  const [parks, setParks] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mySavedParks, setMySavedParks] = useState(
    localStorage.getItem("Saved Parks")
      ? JSON.parse(localStorage.getItem("Saved Parks"))
      : []
  );

  function isParkSaved(parks) {
    return mySavedParks.some((p) => p.id === parks.id);
  }

  const handleToggleMySavedParks = useCallback(
    (savedPark) => {
      const isParkAlreadySavedToMyParks = mySavedParks.find(
        (park) => savedPark.id === park.id
      );
      if (isParkAlreadySavedToMyParks) {
        const myParksWithoutThisPark = mySavedParks.filter(
          (park) => savedPark.id !== park.id
        );
        setMySavedParks(myParksWithoutThisPark);
      } else if (!isParkAlreadySavedToMyParks) {
        setMySavedParks((prev) => [...prev, savedPark]);
      }
    },
    [mySavedParks]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint.parks}?limit=500`, {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with response: ${response.status}`);
        }

        const json = await response.json();

        if (isMounted) {
          setParks(json.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("An error occurred while fetching parks data:", error);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (true) {
      case path === "/":
        document.title = "US National Parks";
        setHeaderTitle("US National Parks");
        break;
      case path === "/parks":
        document.title = "All Parks";
        setHeaderTitle("All Parks");
        break;

      case path.startsWith("/parks/"):
        setHeaderTitle("Park");
        break;
      case path === "/myparks":
        document.title = "My Parks";
        setHeaderTitle("My Parks");
        break;
      default:
        document.title = "Not Found";
        setHeaderTitle("Not Found");
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("Saved Parks", JSON.stringify(mySavedParks));
  }, [mySavedParks]);

  return (
    <div className="appContainer">
      <Header title={headerTitle} />
      <Routes>
        <Route path="/" element={<FeaturedSection />} />

        <Route
          path="/parks"
          element={<Parks parks={parks} isLoading={isLoading} />}
        />
        <Route
          path="/parks/:parkCode"
          element={
            <SinglePark
              parks={parks}
              isParkSaved={isParkSaved}
              handleToggleMySavedParks={handleToggleMySavedParks}
            />
          }
        ></Route>
        <Route
          path="/myparks"
          element={
            <MyParks
              mySavedParks={mySavedParks}
              isParkSaved={isParkSaved}
              handleToggleMySavedParks={handleToggleMySavedParks}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
