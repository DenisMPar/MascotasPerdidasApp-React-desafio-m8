import { PasswordComp } from "components/login/password";
import React from "react";
import { MyText } from "ui/text";
import css from "./index.css";

export function Password() {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Ingresar</MyText>
      </div>
      <div className={css.containerPassword}>
        <PasswordComp></PasswordComp>
      </div>
    </div>
  );
}
