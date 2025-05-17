import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Header = () => {
  return (
    <section className={s.header}>
      <div className="container">
        <div className={s.head}>
          <NavLink className={s.Logo} to="/">
            <svg className={s.iconLogo} width="104" height="16">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </NavLink>
          <div className={s.nav}>
            <NavLink className={buildLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={buildLinkClass} to="/catalog">
              Catalog
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
