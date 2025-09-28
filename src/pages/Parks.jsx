import { useState, useEffect } from "react";
import ParksStyles from "./Parks.module.css";

function Parks() {
  const [parks, setParks] = useState([]);

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

  return (
    <main className={ParksStyles.main}>
      <h2 className={ParksStyles.adventureTitle}>Find your next adventure!</h2>
      <input className={ParksStyles.searchInput} type="text" />
      <i class="fa-solid fa-magnifying-glass"></i>
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
    </main>
  );
}

export default Parks;
