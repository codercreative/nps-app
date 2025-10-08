import ParkStyles from "./Park.module.css";

function Park({ park, isParkSaved, handleToggleMySavedParks }) {
  const name = park.fullName;
  const state = park.states;
  const altName = park.fullName;
  const image = park.images[0].url;
  const imageTitle = park.images[0].title;
  const imageCredit = park.images[0].credit;

  return (
    <main className={ParkStyles.main}>
      <div className={ParkStyles.introSection}>
        <h2>{name}</h2>
        <p>
          Find all the park details you need here to plan your visit. You can
          also save this park to the My Parks page for later reference by
          clicking on the 💚 icon.
        </p>
      </div>
      <div className={ParkStyles.parkTitleIconContainer}>
        <i
          className={`${ParkStyles.loveIcon} fa-heart ${
            isParkSaved(park) ? "fa-solid" : "fa-regular"
          } 
            }`}
          onClick={() => handleToggleMySavedParks(park)}
        ></i>
        <h3 className={ParkStyles.parkTitle}>
          {name}, {state.split(",").join(", ")}
        </h3>
      </div>

      <div>
        <figure className={ParkStyles.figure}>
          <img className={ParkStyles.parkImg} src={image} alt={altName} />
          <figcaption className={ParkStyles.figCaption}>
            {imageTitle}
          </figcaption>
          <figcaption className={ParkStyles.figCaption}>
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

export default Park;
