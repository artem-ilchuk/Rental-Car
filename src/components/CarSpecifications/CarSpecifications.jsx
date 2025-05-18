import s from "./CarSpecifications.module.css";

const CarSpecifications = ({ car }) => {
  return (
    <div className={s.spec}>
      <p className={s.sub}>Car Specifications:</p>
      <ul className={s.list}>
        <li className={s.item}>
          <svg className={s.icons} width="16" height="16">
            <use href="/sprite.svg#calendar" />
          </svg>
          <p className={s.text}>Year: {car.year}</p>
        </li>
        <li className={s.item}>
          <svg className={s.icons} width="16" height="16">
            <use href="/sprite.svg#car" />
          </svg>
          <p className={s.text}>Type: {car.type}</p>
        </li>
        <li className={s.item}>
          <svg className={s.icons} width="16" height="16">
            <use href="/sprite.svg#pump" />
          </svg>
          <p className={s.text}>Fuel Consumption: {car.fuelConsumption}</p>
        </li>
        <li className={s.item}>
          <svg className={s.icons} width="16" height="16">
            <use href="/sprite.svg#gear" />
          </svg>
          <p className={s.text}>Engine Size: {car.engineSize}</p>
        </li>
      </ul>
    </div>
  );
};

export default CarSpecifications;
