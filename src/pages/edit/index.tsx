import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MyText } from "ui/text";
import css from "./index.css";
import { EditForm } from "components/editForm";

export function Edit() {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Editar mascota perdida</MyText>
      </div>
      <EditForm></EditForm>
    </div>
  );
}
