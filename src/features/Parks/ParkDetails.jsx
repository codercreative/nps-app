import ParkDetailsStyles from "./ParkDetails.module.css";

function ParkDetails({ park, isParkSaved, handleToggleMySavedParks }) {
  const name = park.fullName;
  const state = park.states;
  const altName = park.fullName;
  const image = park.images[0].url;
  const imageTitle = park.images[0].title;
  const imageCredit = park.images[0].credit;

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className={ParkDetailsStyles.main}>
      <div className={ParkDetailsStyles.introSection}>
        <h2>{name}</h2>
        <p>
          Find all the park details you need here to plan your visit. You can
          also save this park to the My Parks page for later reference by
          clicking on the 💚 icon.
        </p>
      </div>
      <div className={ParkDetailsStyles.parkTitleIconContainer}>
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
          <button className={ParkDetailsStyles.heartBtn}>
            <i
              className={`${ParkDetailsStyles.loveIcon} fa-heart ${
                isParkSaved(park) ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </button>
        </form>

        <h3 className={ParkDetailsStyles.parkTitle}>
          {name}, {state.split(",").join(", ")}
        </h3>
      </div>

      <div>
        <figure className={ParkDetailsStyles.figure}>
          <img
            className={ParkDetailsStyles.parkImg}
            src={image}
            alt={altName}
          />
          <figcaption className={ParkDetailsStyles.figCaption}>
            {imageTitle}
          </figcaption>
          <figcaption className={ParkDetailsStyles.figCaption}>
            Credit: {imageCredit}
          </figcaption>
        </figure>
      </div>
      <div>
        <h3>Check out the information below to plan your visit.</h3>
        <h3>List of fun park adventures to be added......</h3>
      </div>
    </main>
  );
}

export default ParkDetails;
