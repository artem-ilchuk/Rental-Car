import s from "./CarDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../redux/cars/operations";
import { selectSelectedCar } from "../../redux/cars/selectors";
import Loader from "../Loader/Loader";
import CarMainInfo from "../CarMainInfo/CarMainInfo";
import CarSpecifications from "../CarSpecifications/CarSpecifications";
import RentalConditions from "../RentalConditions/RentalConditions";
import Accessories from "../Accessories/Accessories";
import OrderForm from "../OrderForm/OrderForm";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectSelectedCar);
  const defaultImg = "/Image not found.webp";

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <Loader />;

  return (
    <section className="container">
      <div className={s.content}>
        <div className={s.formPanel}>
          <img
            src={car.img || defaultImg}
            width={640}
            height={512}
            alt="poster"
            className={s.img}
          />
          <OrderForm />
        </div>
        <div className={s.carData}>
          <CarMainInfo car={car} />
          <RentalConditions />
          <CarSpecifications car={car} />
          <Accessories car={car} />
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
