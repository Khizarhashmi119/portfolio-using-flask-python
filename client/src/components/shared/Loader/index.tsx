import { PropagateLoader } from "react-spinners";

import "./styles.scss";

const Loader = () => {
  const color0 = document.documentElement.style.getPropertyValue('--color-0');

  return (
    <div className="loader-container">
      <PropagateLoader color={color0}/>
    </div>
  );
};

export default Loader;
