import AboutStyles from "./About.module.css";

function About() {
  return (
    <main className={AboutStyles.main}>
      <div>
        <h2 c>Explore</h2>
        <p>
          Explore beautiful trails, hidden gems, and immersive experiences.
          Whether you are looking to hike, relax, or reconnect with nature, your
          next adventure starts here!
        </p>
        <p>
          There are states without national parks.
          https://visitusaparks.com/only-states-without-a-national-park/
        </p>
      </div>
    </main>
  );
}

export default About;
