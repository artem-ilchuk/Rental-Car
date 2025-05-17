import s from "./Car.module.css";
import { NavLink } from "react-router-dom";
import { formattedAddress, formattedMileage } from "../../utils/Formatter.js";

const Car = ({ car }) => {
  const defaultImg = "/Image not found.webp";
  const { city, country } = formattedAddress(car.address);
  const miles = formattedMileage(car.mileage);

  return (
    <div className={s.card}>
      <img
        src={car.img || defaultImg}
        width={276}
        height={268}
        alt="poster"
        className={s.img}
      />
      <div className={s.mainInfo}>
        <div className={s.carBrand}>
          <p className={s.brand}>{car.brand}</p>
          <p className={s.model}>{car.model},</p>
          <p className={s.year}>{car.year}</p>
        </div>
        <p className={s.price}>${car.rentalPrice}</p>
      </div>
      <div className={s.details}>
        <p className={s.city}>{city}</p>
        <svg className={s.line} width="2" height="16">
          <use href="/sprite.svg#divider" />
        </svg>
        <p className={s.country}>{country}</p>
        <svg className={s.line} width="2" height="16">
          <use href="/sprite.svg#divider" />
        </svg>
        <p className={s.rentalCompany}>{car.rentalCompany}</p>
        <svg className={s.line} width="2" height="16">
          <use href="/sprite.svg#divider" />
        </svg>
      </div>
      <div className={s.details2}>
        <p className={s.type}>{car.type}</p>
        <svg className={s.line} width="2" height="16">
          <use href="/sprite.svg#divider" />
        </svg>
        <p className={s.mileage}>{miles}</p>
      </div>
      <div className={s.nav}>
        <NavLink to={`/catalog/${car.id}`} className={s.link}>
          Read more
        </NavLink>
      </div>
    </div>
  );
};

export default Car;
