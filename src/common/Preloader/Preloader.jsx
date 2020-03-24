import React from "react";
import classes from "./Preloader.module.css";
import loading from "../../assets/image/loading.gif";

const Preloader = () => {
  return (
    <div className={classes.wrapper}>
      <img className={classes.loading} src={loading} alt="Loader" />
    </div>
  );
};

export default Preloader;
