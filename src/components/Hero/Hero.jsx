import s from "./Hero.module.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className={s.hero}>
      <div className="container">
        <div className={s.content}>
          <h2 className={s.title}>Find your perfect rental car</h2>
          <p className={s.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <NavLink to="/catalog" className={s.nav}>
            View Catalog
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
