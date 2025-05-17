import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handlePagination }) => {
  return (
    <div className={s.pag}>
      <button onClick={handlePagination} className={s.btn}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
