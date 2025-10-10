import { useParams } from "react-router";
import Park from "./ParkDetails.jsx";

function SinglePark({ parks, isParkSaved, handleToggleMySavedParks }) {
  const { parkCode } = useParams();

  const park = parks.find((park) => park.parkCode === parkCode);

  if (!park) {
    return <p>Selected park loading...</p>;
  }

  return (
    <>
      <Park
        park={park}
        isParkSaved={isParkSaved}
        handleToggleMySavedParks={handleToggleMySavedParks}
      />
    </>
  );
}

export default SinglePark;
