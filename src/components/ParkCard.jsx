import { useState } from "react";
import ParkCardStyles from "./ParkCard.module.css";

function ParkCard({ name, image, imageCredit }) {
  return (
    <>
      <h2>{name}</h2>
      <div>
        <figure className={ParkCardStyles.figure}>
          <img className={ParkCardStyles.parkImg} src={image} alt={name} />
        </figure>
        <p>Credit: {imageCredit}</p>
      </div>
    </>
  );
}

export default ParkCard;
