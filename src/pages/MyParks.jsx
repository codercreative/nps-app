import Park from "../features/Parks/Park.jsx";

import MyParksStyles from "./MyParks.module.css";

function MyParks({ myParks, isParkSaved, handleToggleMyParks }) {
  return (
    <main className={MyParksStyles.main}>
      <div>
        <h2>My Favorite Parks</h2>
        <p>
          Here are your saved parks for quick access. Click any park to see more
          details, or tap the heart icon to remove it from your list.
        </p>
      </div>
      <div>
        {myParks.map((park) => (
          <Park
            key={park.id}
            park={park}
            isParkSaved={isParkSaved}
            handleToggleMyParks={handleToggleMyParks}
          />
        ))}
      </div>
    </main>
  );
}

export default MyParks;
