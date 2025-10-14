import { useState } from "react";
import ParkDetails from "../features/Parks/ParkDetails.jsx";
import IntroTextWrapper from "../shared/IntroTextWrapper.jsx";
import MyParksStyles from "./MyParks.module.css";

function MyParks({ mySavedParks, isParkSaved, handleToggleMySavedParks }) {
  const [showSelectedParkDetails, setShowSelectedParkDetails] = useState(null);

  const userSelectedPark = mySavedParks.find(
    (p) => p.id === showSelectedParkDetails
  );

  if (showSelectedParkDetails && !userSelectedPark) {
    setShowSelectedParkDetails(null);
  }

  return (
    <main className={MyParksStyles.main}>
      {showSelectedParkDetails ? (
        <ParkDetails
          key={showSelectedParkDetails}
          park={userSelectedPark}
          isParkSaved={isParkSaved}
          handleToggleMySavedParks={handleToggleMySavedParks}
          onBack={() => setShowSelectedParkDetails(null)}
        />
      ) : (
        <>
          {mySavedParks.length === 0 ? (
            <IntroTextWrapper>
              <h2>Dedicated Page for Your Favorite Parks</h2>
              <p>
                Browse the <em>All Parks</em> page. When you find a park you
                like, open it to view more details. Click the 💚 icon to save it
                here, and voilà - your parks are saved here for quick access.
              </p>
            </IntroTextWrapper>
          ) : (
            <IntroTextWrapper>
              <h2>My Favorite Parks</h2>
              <p>
                Here are your saved parks for quick access. Click any park to
                see more details, or tap the heart icon to remove it from your
                list.
              </p>
            </IntroTextWrapper>
          )}

          {mySavedParks.map((park) => (
            <div key={park.id} className={MyParksStyles.heartAndParkWrapper}>
              {/* HEART ICON */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleToggleMySavedParks(park);
                }}
                aria-label={
                  isParkSaved(park)
                    ? "Remove from My Parks page"
                    : "Save to My Parks page"
                }
              >
                <button className={MyParksStyles.heartBtn}>
                  <i
                    className={`${MyParksStyles.loveIcon} fa-heart ${
                      isParkSaved(park) ? "fa-solid" : "fa-regular"
                    }`}
                  ></i>
                </button>
              </form>
              {/* ====PARK INFO==== */}
              <div
                key={park.id}
                className={MyParksStyles.parkListContainer}
                onClick={() => setShowSelectedParkDetails(park.id)}
              >
                <figure className={MyParksStyles.figure}>
                  <img
                    className={MyParksStyles.img}
                    src={park.images[0].url}
                    alt={park.fullName}
                  />
                </figure>
                <p>
                  {park.fullName}, {park.states.split(",").join(", ")}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
}

export default MyParks;
