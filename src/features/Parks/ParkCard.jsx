import { useState } from "react";

import ParkCardStyles from "./ParkCard.module.css";

function ParkCard({ name, altName, image, imageTitle, imageCredit }) {
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
      </div>

      <h3>Check out the information below to plan your visit.</h3>
      <div>
        <figure className={ParkCardStyles.figure}>
          <img className={ParkCardStyles.parkImg} src={image} alt={altName} />
        </figure>
        <p>{imageTitle}</p>
        <p>Credit: {imageCredit}</p>
      </div>
    </>
  );
}

export default ParkCard;
