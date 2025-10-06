import { useState } from "react";

import ParkStyles from "./Park.module.css";

function Park({ park, setSelectedPark }) {
  const [isLoved, setIsLoved] = useState(false);

  //   <Park
  //   key={selectedPark.id}
  //   park={selectedPark}
  //   name={selectedPark.fullName}
  //   altName={selectedPark.images[0].altText}
  //   image={selectedPark.images[0].url}
  //   imageTitle={selectedPark.images[0].title}
  //   imageCredit={selectedPark.images[0].credit}
  // />

  const name = park.fullName;
  const state = park.states;
  const altName = park.fullName;
  const image = park.images[0].url;
  const imageTitle = park.images[0].title;
  const imageCredit = park.images[0].credit;

  return (
    <>
      <section className={ParkStyles.parkSection}>
        <div className={ParkStyles.parkTitleIconContainer}>
          <i
            className={`${ParkStyles.loveIcon} fa-heart ${
              isLoved ? "fa-solid" : "fa-regular"
            }`}
            onClick={() => setIsLoved(!isLoved)}
          ></i>
          <h2 className={ParkStyles.parkTitle}>
            {name}, {state.split(",").join(", ")}
          </h2>
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
      </section>
    </>
  );
}

export default Park;
