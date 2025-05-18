import s from "./Car.module.css";
import { NavLink } from "react-router-dom";
import { formattedAddress, formattedMileage } from "../../utils/Formatter.js";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite } from "../../redux/filters/selectors.js";
import { addToList, removeFromList } from "../../redux/filters/slice.js";
const Car = ({ car }) => {
  const defaultImg = "/Image not found.webp";
  const { city, country } = formattedAddress(car.address);
  const miles = formattedMileage(car.mileage);

  const dispatch = useDispatch();
  const isActive = useSelector(selectIsFavorite(car.id));
  const switchIcon = () => {
    if (isActive) {
      dispatch(removeFromList(car.id));
    } else {
      dispatch(addToList(car));
    }
  };

  return (
    <div className={s.card}>
      <img
        src={car.img || defaultImg}
        width={276}
        height={268}
        alt="poster"
        className={s.img}
      />
      <div onClick={switchIcon}>
        {!isActive ? (
          <svg className={s.heart}>
            <use href="/sprite.svg#heart_def" />
          </svg>
        ) : (
          <svg className={s.heartActive}>
            <use href="/sprite.svg#heart_active" />
          </svg>
        )}
      </div>
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
