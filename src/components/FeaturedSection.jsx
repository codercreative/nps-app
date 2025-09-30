import FeaturedStyles from "./FeaturedSection.module.css";

function FeaturedSection() {
  return (
    <section className={FeaturedStyles.container}>
      <div>
        <figure className={FeaturedStyles.figure}>
          <img
            className={FeaturedStyles.parkImg}
            src="https://www.nps.gov/common/uploads/structured_data/05383E91-AA28-2DDC-AB517507594F9FA6.jpg"
            alt="Upper Yosemite Fall and Merced River in spring"
          />
          <figcaption className={FeaturedStyles.figCaption}>
            Yosemite National Park | Credit: NPS Photo.
          </figcaption>
        </figure>
      </div>

      <div className={FeaturedStyles.explore}>
        <h2>Explore</h2>
        <p>
          Click on the image above or the Parks button at the top of this page
          to explore beautiful trails, hidden gems, and immersive experiences.
          Whether you are looking to hike, relax, or reconnect with nature, your
          next adventure starts here!
        </p>
      </div>
    </section>
  );
}
export default FeaturedSection;
