import { useParams } from "react-router";
import Park from "./Park.jsx";

function SingleParkRoute({ parks }) {
  const { parkCode } = useParams();
  console.log(parkCode);

  const park = parks.find((park) => park.parkCode === parkCode);

  if (!park) {
    return <p>Selected park loading...</p>;
  }

  return (
    <>
      <Park park={park} />
    </>
  );
}

export default SingleParkRoute;
