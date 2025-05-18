import s from "./CarMainInfo.module.css";
import {
  formattedAddress,
  formattedId,
  formattedMileage,
} from "../../utils/Formatter";

const CarMainInfo = ({ car }) => {
  const { city, country } = formattedAddress(car.address);
  const miles = formattedMileage(car.mileage);
  const shortId = formattedId(car.id);

  return (
    <div className={s.main}>
      <div className={s.car}>
        <p className={s.brand}>
          {car.brand} {car.model}, {car.year}
        </p>
        <p className={s.id}>Id: {shortId}</p>
      </div>
      <div className={s.info}>
        <svg className={s.location} width="16" height="16">
          <use href="/Location.svg#location" />
        </svg>
        <p className={s.address}>
          {city}, {country}
        </p>
        <p className={s.mile}>Mileage: {miles} km</p>
      </div>
      <p className={s.price}>${car.rentalPrice}</p>
      <p className={s.description}>{car.description}</p>
    </div>
  );
};

export default CarMainInfo;
