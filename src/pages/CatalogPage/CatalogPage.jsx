import s from "./CatalogPage.module.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import CarsList from "../../components/CarsList/CarsList";

const CatalogPage = () => {
  return (
    <div className="container">
      <FilterBar />
      <CarsList />
    </div>
  );
};

export default CatalogPage;
