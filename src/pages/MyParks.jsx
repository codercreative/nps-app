import Park from "../features/Parks/Park.jsx";
import IntroTextWrapper from "../shared/IntroTextWrapper.jsx";

import MyParksStyles from "./MyParks.module.css";

function MyParks({ mySavedParks, isParkSaved, handleToggleMySavedParks }) {
  return (
    <main className={MyParksStyles.main}>
      <IntroTextWrapper>
        <h2>My Favorite Parks</h2>
        <p>
          Here are your saved parks for quick access. Click any park to see more
          details, or tap the heart icon to remove it from your list.
        </p>
      </IntroTextWrapper>
      <div>
        {mySavedParks.map((park) => (
          <Park
            key={park.id}
            park={park}
            isParkSaved={isParkSaved}
            handleToggleMySavedParks={handleToggleMySavedParks}
          />
        ))}
      </div>
    </main>
  );
}

export default MyParks;
