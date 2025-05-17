import s from "./CarsList.module.css";
import Car from "../Car/Car";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";
import { selectCars } from "../../redux/cars/selectors";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      <ul className={s.list}>
        {cars.map((car) => (
          <li key={car.id} className={s.item}>
            <Car car={car} />
          </li>
        ))}
      </ul>
      <LoadMoreBtn />
    </div>
  );
};

export default CarsList;
