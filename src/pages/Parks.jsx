import { useState, useEffect } from "react";
import ParkCard from "../components/ParkCard.jsx";
import ParksStyles from "./Parks.module.css";

function Parks() {
  const [parks, setParks] = useState([]);
  const [userInputText, setUserInputText] = useState("");
  const [matchedPark, setMatchedPark] = useState(null);

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
    };
    fetchData();
  }, []);

  function handleSearchPark(e) {
    const userInput = e.target.value.toLowerCase();
    setUserInputText(userInput);

    const parkMatch = parks.find((park) => {
      const parkTitle = park.fullName.toLowerCase();
      return parkTitle.includes(userInput);
    });

    setMatchedPark(parkMatch);
  }

  return (
    <main className={ParksStyles.main}>
      <h2 className={ParksStyles.adventureTitle}>Find your next adventure!</h2>
      <p>Search by name or state below.</p>
      <div className={ParksStyles.searchContainer}>
        <input
          className={ParksStyles.searchPark}
          type="text"
          placeholder="Search by park name"
          value={userInputText}
          onChange={handleSearchPark}
        />
        <select
          className={ParksStyles.selectState}
          name=""
          id=""
          placeholder="Select State"
        ></select>
        <button className={ParksStyles.clearSearch}>Clear search</button>
        {/* <i class="fa-solid fa-magnifying-glass"></i> */}
      </div>

      {matchedPark ? (
        <ParkCard
          park={matchedPark}
          name={matchedPark.fullName}
          image={matchedPark.images[0].url}
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
