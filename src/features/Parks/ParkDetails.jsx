import { useState, useEffect } from "react";
import ParkDetailsStyles from "./ParkDetails.module.css";

function ParkDetails({ park, isParkSaved, handleToggleMySavedParks, onBack }) {
  const name = park.fullName;
  const state = park.states;
  const altName = park.fullName;
  const image = park.images[0].url;
  const imageTitle = park.images[0].title;
  const imageCredit = park.images[0].credit;

  const [thingsToDoData, setThingsToDoData] = useState([]);
  const [visitorCenters, setVisitorCenters] = useState([]);
  const [isLoadingVisitorCenter, setIsLoadingVisitorCenter] = useState(true);
  const [isLoadingThingsToDo, setIsLoadingThingsToDo] = useState(true);

  const baseURL = "https://developer.nps.gov/api/v1";

  const endpoints = {
    thingstodo: (parkCode) => `${baseURL}/thingstodo?parkCode=${parkCode}`,
    visitorcenters: (parkCode) =>
      `${baseURL}/visitorcenters?parkCode=${parkCode}`,
  };

  useEffect(() => {
    let isMounted = true;
    const fetchThingsToDoData = async () => {
      const response = await fetch(endpoints.thingstodo(park.parkCode), {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      });
      const json = await response.json();
      console.log(json);
      if (isMounted) {
        setThingsToDoData(json.data);
        setIsLoadingThingsToDo(false);
      }
    };
    fetchThingsToDoData();
    return () => {
      isMounted = false;
    };
  }, [park.parkCode]);

  useEffect(() => {
    let isMounted = true;
    const fetchVisitorCenters = async () => {
      const response = await fetch(endpoints.visitorcenters(park.parkCode), {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      });
      const json = await response.json();
      console.log(json);
      if (isMounted) {
        setVisitorCenters(json.data);
        setIsLoadingVisitorCenter(false);
      }
    };
    fetchVisitorCenters();
    return () => {
      isMounted = false;
    };
  }, [park.parkCode]);

  const firstPhysicalAddress = visitorCenters.find(
    (center) => center.addresses[0]?.type === "Physical"
  );

  const saveParkMessage = !isParkSaved(park) ? (
    <p>
      You can save this park to the My Parks page for later reference by
      clicking on the 💚 icon.
    </p>
  ) : null;

  return (
    <main className={ParkDetailsStyles.main}>
      <div className={ParkDetailsStyles.introSection}>
        <div className={ParkDetailsStyles.parkNameAndBackBtnWrapper}>
          <h2>{name}</h2>
          {onBack && (
            <button className={ParkDetailsStyles.backBtn} onClick={onBack}>
              Back to My Parks List
            </button>
          )}
        </div>
        <div>
          {isLoadingThingsToDo || isLoadingVisitorCenter ? (
            <p>Loading park details message...</p>
          ) : visitorCenters.length > 0 && thingsToDoData.length > 0 ? (
            <>
              <p className={ParkDetailsStyles.firstUserMsgSentence}>
                Find all the park details you need here to plan your visit.{" "}
              </p>
              {saveParkMessage}
            </>
          ) : (
            <>
              <p className={ParkDetailsStyles.firstUserMsgSentence}>
                Visitor information for this park is limited.{" "}
              </p>
              {saveParkMessage}
            </>
          )}
        </div>
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
      <div className={ParkDetailsStyles.visitorCenterWrapper}>
        <h3>Visitor Center:</h3>
        {isLoadingVisitorCenter ? (
          <p>Loading visitor center details...</p>
        ) : firstPhysicalAddress &&
          firstPhysicalAddress.url &&
          firstPhysicalAddress.url.includes("nps.gov") ? (
          <>
            <a
              href={firstPhysicalAddress?.url}
              target="_blank"
              className={ParkDetailsStyles.visitorCenterName}
            >
              {firstPhysicalAddress.name}
            </a>
            {firstPhysicalAddress.name !==
              firstPhysicalAddress.addresses[0].line1 && (
              <p>{firstPhysicalAddress.addresses[0].line1}</p>
            )}

            <p>
              {firstPhysicalAddress.addresses[0].city}{" "}
              {firstPhysicalAddress.addresses[0].stateCode}{" "}
              {firstPhysicalAddress.addresses[0].postalCode}
            </p>
          </>
        ) : (
          <p>No visitor center found for this park</p>
        )}
      </div>
      <div>
        <h3>Suggested Activities:</h3>

        {isLoadingThingsToDo ? (
          <p>Loading things to do...</p>
        ) : thingsToDoData.length === 0 ? (
          <p>No activities found for this park</p>
        ) : (
          thingsToDoData.slice(0, 7).map((activity) => (
            <p key={activity.id}>
              <a
                className={ParkDetailsStyles.activityLinks}
                href={activity.url}
              >
                {activity.title}
              </a>
            </p>
          ))
        )}
      </div>
    </main>
  );
}

export default ParkDetails;
