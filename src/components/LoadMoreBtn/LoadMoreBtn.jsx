import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={s.pag}>
      <button onClick={onClick} className={s.btn}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
