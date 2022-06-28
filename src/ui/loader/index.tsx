import React from "react";
import css from "./index.css";
import source from "images/logo.svg";

//componente que muestra un spinner de carga
function LoaderComp() {
  return (
    <div className={css.root}>
      <div className={css.spinner}>
        <img src={source}></img>
      </div>
      ;
    </div>
  );
}

export { LoaderComp };
