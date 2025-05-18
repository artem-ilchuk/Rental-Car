import s from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";
import toast from "react-hot-toast";
import {
  selectCars,
  selectQuery,
  selectPage,
  selectIsLoading,
  selectTotalPages,
} from "../../redux/cars/selectors";
import { setQuery, setPage, clearCars } from "../../redux/cars/slice";
import FilterBar from "../../components/FilterBar/FilterBar";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(clearCars());
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(fetchCars({ page, query }));
  }, [dispatch, page, query]);

  const handleChangeQuery = (newQueryPart) => {
    dispatch(setQuery(newQueryPart));
  };

  const handlePagination = () => {
    if (page < totalPages) {
      dispatch(setPage(Number(page) + 1));
    } else {
      toast.info(
        `We are sorry, but you have reached the end of search results.`
      );
    }
  };

  return (
    <div className={`container ${s.catalogPage}`}>
      <FilterBar onChange={handleChangeQuery} />
      <CarsList cars={cars} />
      {cars.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handlePagination} className={s.loadMoreBtn} />
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default CatalogPage;
