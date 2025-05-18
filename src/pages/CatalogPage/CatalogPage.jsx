import s from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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
  const ITEMS_PER_PAGE = 12;

  const didFetchRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(clearCars());
      try {
        const resultAction = await dispatch(
          fetchCars({ page, query, limit: ITEMS_PER_PAGE })
        );

        if (fetchCars.fulfilled.match(resultAction)) {
          if (!didFetchRef.current) {
            toast.success("Cars found for you successfully!");
            didFetchRef.current = true;
          }
        } else if (fetchCars.rejected.match(resultAction)) {
          toast.error("Failed to find cars. Please try again.");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchData();
  }, [dispatch, page, query]);

  const handleChangeQuery = (newQueryPart) => {
    dispatch(setQuery(newQueryPart));
    didFetchRef.current = false;
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
