import s from "./Car.module.css";
import { NavLink } from "react-router-dom";
import { formattedAddress } from "../../utils/adressFormatter";

const Car = ({ car }) => {
  const defaultImg = "/Image not found.webp";
  const { city, country } = formattedAddress(car.address);
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
      <p className={s.price}>{car.price}</p>
      <p className={s.address}>
        {city},{country}
      </p>
      <p className={s.rentalCompany}>{car.rentalCompany}</p>
      <p className={s.type}>{car.type}</p>
      <p className={s.mileage}>{car.mileage}</p>
      <NavLink to={`/catalog/${car.id}`} className={s.nav}>
        Read more
      </NavLink>
    </div>
  );
};

export default Car;
