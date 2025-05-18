import { PuffLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <PuffLoader color="#3470ff" size={150} />
    </div>
  );
};

export default Loader;
