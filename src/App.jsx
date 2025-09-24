//ok to use App.css instead of styled components or css module??
import "./App.css";

import { useState, useEffect } from "react";

import Header from "./shared/Header";
import Footer from "./shared/Footer";

function App() {
  const [parks, setParks] = useState([]);

  const baseURL = "https://developer.nps.gov/api/v1";

  const endpoint = {
    parks: `${baseURL}/parks`,
  };

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
    <>
      <div className="appContainer">
        <Header />
        {parks.map((park) => {
          return (
            <div className="container" key={park.id}>
              <div>
                <figure className="figure">
                  <img
                    className="parkImg"
                    src={park.images[0].url}
                    alt={park.fullName}
                  />
                  <figcaption className="figCaption">
                    {/* //Need to filter out the images that are not NPS photo credited */}
                    {park.images[0].caption}. Credit: {park.images[0].credit}
                  </figcaption>
                </figure>
              </div>
            </div>
          );
        })}
        <div className="explore">
          <h2>Explore</h2>
          <p>
            Click on the image above or the Parks button at the top of this page
            to explore beautiful trails, hidden gems, and immersive national
            experiences. Whether you are looking to hike, relax, or reconnect
            with nature, your next adventure starts here!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
