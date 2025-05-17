import s from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchCars } from "../../redux/cars/operations";
import {
  selectCars,
  selectQuery,
  selectPage,
  selectIsLoading,
  selectBrands,
  selectPrices,
} from "../../redux/cars/selectors";
import { setQuery, setPage, clearCars } from "../../redux/cars/slice";
import FilterBar from "../../components/FilterBar/FilterBar";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const cars = useSelector(selectCars);
  const brands = useSelector(selectBrands);
  const prices = useSelector(selectPrices);
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      dispatch(clearCars());
    } else {
      dispatch(fetchCars({ query, page }));
    }
  }, [dispatch, query, page]);

  const handleChangeQuery = (newQueryPart) => {
    dispatch(setQuery(newQueryPart));
  };

  const handlePagination = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={`container ${s.catalogPage}`}>
      <FilterBar
        onChange={handleChangeQuery}
        query={query}
        brands={brands}
        prices={prices}
      />
      <CarsList cars={cars} />
      {cars.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handlePagination} className={s.loadMoreBtn} />
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CatalogPage;
