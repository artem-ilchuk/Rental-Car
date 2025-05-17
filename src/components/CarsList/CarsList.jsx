import s from "./CarsList.module.css";
import Car from "../Car/Car";

const CarsList = ({ cars }) => {
  return (
    <div>
      <ul className={s.list}>
        {cars.map((car) => (
          <li key={car.id} className={s.item}>
            <Car car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsList;
