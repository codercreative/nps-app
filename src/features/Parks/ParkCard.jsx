import { useState } from "react";

import ParkCardStyles from "./ParkCard.module.css";

function ParkCard({
  name,
  altName,
  image,
  imageTitle,
  imageCredit,
  setSelectedPark,
}) {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <>
      <div className={ParkCardStyles.loveParkContainer}>
        <i
          className={`${ParkCardStyles.loveIcon} fa-heart ${
            isLoved ? "fa-solid" : "fa-regular"
          }`}
          onClick={() => setIsLoved(!isLoved)}
        ></i>
        <h2>{name}</h2>
        <button
          className={ParkCardStyles.backBtn}
          onClick={() => setSelectedPark(null)}
        >
          Back to list of all parks
        </button>
      </div>

      <h3>Check out the information below to plan your visit.</h3>
      <div>
        <figure className={ParkCardStyles.figure}>
          <img className={ParkCardStyles.parkImg} src={image} alt={altName} />
        </figure>
        <p>{imageTitle}</p>
        <p>Credit: {imageCredit}</p>
      </div>
      <h3>List of fun park adventures to be added......</h3>
    </>
  );
}

export default ParkCard;
