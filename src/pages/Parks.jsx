import { useState, useEffect } from "react";
import ParkCard from "../features/Parks/ParkCard.jsx";
import ParksStyles from "./Parks.module.css";

function Parks() {
  const [parks, setParks] = useState([]);
  const [userInputText, setUserInputText] = useState("");
  const [matchedPark, setMatchedPark] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  function handleEnterKey(e) {
    console.log(e);
    if (e.key === "Enter") {
      if (matchedPark) {
        handleSelectedPark(matchedPark);
        setUserInputText("");
      }
    }
  }

  function handleSearchPark(e) {
    const userInput = e.target.value.toLowerCase();
    setUserInputText(userInput);

    const parkMatch = parks.find((park) => {
      const parkTitle = park.fullName.toLowerCase();
      return parkTitle.includes(userInput);
    });

    setMatchedPark(parkMatch);
  }

  function handleSelectedPark(park) {
    setSelectedPark(park);
    setUserInputText("");
  }

  const titleAndSearchFields = (
    <>
      <h2 className={ParksStyles.adventureTitle}>Find your next adventure!</h2>
      <p>Search by name or select a park from the list below.</p>
      <div className={ParksStyles.searchContainer}>
        <input
          className={ParksStyles.searchPark}
          type="text"
          placeholder="Search by park name"
          value={userInputText}
          onChange={handleSearchPark}
          onKeyDown={handleEnterKey}
        />

        <button
          className={ParksStyles.selectBtn}
          onClick={() => handleSelectedPark(matchedPark)}
        >
          Select
        </button>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <main className={ParksStyles.main}>
        {titleAndSearchFields}
        <div className={ParksStyles.loadingContainer}>
          <i className="fa-solid fa-spinner"></i>
          <p>Loading parks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={ParksStyles.main}>
      {titleAndSearchFields}

      {selectedPark ? (
        <ParkCard
          key={selectedPark.id}
          park={selectedPark}
          name={selectedPark.fullName}
          altName={selectedPark.images[0].altText}
          image={selectedPark.images[0].url}
          imageTitle={selectedPark.images[0].title}
          imageCredit={selectedPark.images[0].credit}
        />
      ) : matchedPark ? (
        <ParkCard
          key={matchedPark.id}
          park={matchedPark}
          name={matchedPark.fullName}
          altName={matchedPark.images[0].altText}
          image={matchedPark.images[0].url}
          imageTitle={matchedPark.images[0].title}
          imageCredit={matchedPark.images[0].credit}
        />
      ) : (
        <div>
          {parks.map((park) => {
            return (
              <div className={ParksStyles.parkListContainer} key={park.id}>
                <figure className={ParksStyles.figure}>
                  <img
                    className={ParksStyles.img}
                    src={park.images[0].url}
                    alt={park.fullName}
                  />
                </figure>
                <p>
                  {park.fullName}, {park.states}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Parks;
