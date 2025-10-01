import ParkCardStyles from "./ParkCard.module.css";

function ParkCard({ name, altName, image, imageTitle, imageCredit }) {
  return (
    <>
      <h2>{name}</h2>

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
