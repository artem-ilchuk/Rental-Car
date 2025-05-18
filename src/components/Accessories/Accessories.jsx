import s from "./Accessories.module.css";

const Accessories = ({ car }) => {
  const allItems = [...car.accessories, ...car.functionalities];

  return (
    <div className={s.accessory}>
      <p className={s.sub}>Accessories and functionalities:</p>
      <ul className={s.list}>
        {allItems.map((item, idx) => (
          <li key={idx} className={s.item}>
            <svg className={s.check} width="16" height="16">
              <use href="/sprite.svg#check" />
            </svg>
            <p className={s.req}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accessories;
