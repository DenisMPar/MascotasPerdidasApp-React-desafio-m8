import React from "react";
import "../../../index.css";
import { MyText } from "ui/text";
import css from "./index.css";
import { PublishForm } from "components/publishForm";

export function Publish() {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Reportar mascota perdida</MyText>
      </div>
      <div className={css.containerForm}>
        <PublishForm></PublishForm>
      </div>
    </div>
  );
}
