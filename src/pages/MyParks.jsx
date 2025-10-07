import MyParksStyles from "./MyParks.module.css";

function MyParks({ handleMyParks, park, myParks, setMyParks }) {
  return (
    <main className={MyParksStyles.main}>
      <div>
        <h2>My Favorite Parks</h2>
        <p>
          Here are your saved parks for quick access. Click any park to see more
          details, or tap the heart icon to remove it from your list.
        </p>
      </div>
      <div></div>
    </main>
  );
}

export default MyParks;
