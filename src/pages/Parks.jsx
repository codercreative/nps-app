import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Park from "../features/Parks/Park.jsx";
import ParksStyles from "./Parks.module.css";

function Parks({ parks, isLoading }) {
  // const [parks, setParks] = useState([]);
  const [userInputText, setUserInputText] = useState("");
  const [matchedPark, setMatchedPark] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const baseURL = "https://developer.nps.gov/api/v1";
  // const endpoint = {
  //   parks: `${baseURL}/parks`,
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(`${endpoint.parks}?limit=500`, {
  //       headers: {
  //         "X-Api-Key": import.meta.env.VITE_API_KEY,
  //       },
  //     });
  //     const json = await result.json();
  //     console.log(json);
  //     setParks(json.data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  function handleEnterKey(e) {
    console.log(e);
    if (e.key === "Enter") {
      if (matchedPark) {
        // handleSelectedPark(matchedPark);
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

  // function handleSelectedPark(park) {
  //   setSelectedPark(park);
  //   setUserInputText("");
  // }

  function handleClickPark(park) {
    navigate(`/parks/${park.parkCode}`, { state: { park } });
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstPark = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(parks.length / itemsPerPage);

  function handlePreviousPage() {
    if (currentPage === 1) return;
    setSearchParams({ page: currentPage - 1 });
  }

  function handleNextPage() {
    if (currentPage === totalPages) return;
    setSearchParams({ page: currentPage + 1 });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate("/parks");
      }
    }
  }, [currentPage, totalPages, navigate]);

  if (isLoading) {
    return (
      <main className={ParksStyles.main}>
        <div className={ParksStyles.loadingContainer}>
          <i className="fa-solid fa-spinner"></i>
          <h2>Loading parks...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className={ParksStyles.main}>
      <h2 className={ParksStyles.adventureTitle}>Find your next adventure!</h2>
      <p>
        Explore the beauty of the US national parks! Whether you are looking for
        towering mountains, vast deserts, lush forests, or sparkling lakes, you
        will find it here. Use the search bar to quickly find a specific park,
        or browse the full list to discover your next adventure. You can also
        save parks you love to My Parks to keep track of your favorites and plan
        future visits.
      </p>

      <div className={ParksStyles.searchContainer}>
        <input
          className={ParksStyles.searchPark}
          type="text"
          placeholder="Search by park name"
          value={userInputText}
          onChange={handleSearchPark}
          onKeyDown={handleEnterKey}
        />
      </div>

      {selectedPark ? (
        <Park
          key={selectedPark.id}
          park={selectedPark}
          name={selectedPark.fullName}
          altName={selectedPark.images[0].altText}
          image={selectedPark.images[0].url}
          imageTitle={selectedPark.images[0].title}
          imageCredit={selectedPark.images[0].credit}
        />
      ) : (
        <div>
          {parks
            .slice(indexOfFirstPark, indexOfFirstPark + itemsPerPage)
            .map((park) => {
              return (
                <Link
                  key={park.id}
                  className={ParksStyles.parkListContainer}
                  to={`/parks/${park.parkCode}`}
                >
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
                </Link>
              );
            })}
          <div className={ParksStyles.paginationControls}>
            <button
              className={ParksStyles.paginationBtn}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={ParksStyles.spanOfPageCount}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={ParksStyles.paginationBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Parks;
