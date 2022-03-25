import React from "react";
import css from "./index.css";

//componente que muestra un spinner de carga
function LoaderComp() {
  return (
    <div className={css.root}>
      <div className={css.spinner}></div>;
    </div>
  );
}

export { LoaderComp };
