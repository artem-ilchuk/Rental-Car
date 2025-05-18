import s from "./RentalConditions.module.css";

const RentalConditions = () => (
  <div className={s.conditions}>
    <p className={s.subtitle}>Rental Conditions:</p>
    <ul className={s.list}>
      <li className={s.item}>
        <svg className={s.check} width="16" height="16">
          <use href="/sprite.svg#check" />
        </svg>
        <p className={s.req}>Minimum age: 25</p>
      </li>
      <li className={s.item}>
        <svg className={s.check} width="16" height="16">
          <use href="/sprite.svg#check" />
        </svg>
        <p className={s.req}>Security deposite required</p>
      </li>
      <li className={s.item}>
        <svg className={s.check} width="16" height="16">
          <use href="/sprite.svg#check" />
        </svg>
        <p className={s.req}>Valid driver`s license</p>
      </li>
    </ul>
  </div>
);

export default RentalConditions;
