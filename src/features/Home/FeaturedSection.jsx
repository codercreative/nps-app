import { NavLink } from "react-router";
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

      <NavLink className={FeaturedStyles.ctaBtn} to="/parks">
        <i className={`fa-solid fa-person-hiking`}></i>
        <span>Start exploring all parks </span>
        <i className={`fa-solid fa-arrow-right`}></i>
      </NavLink>
    </section>
  );
}
export default FeaturedSection;
