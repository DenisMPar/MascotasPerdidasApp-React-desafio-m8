import { PasswordComp } from "components/login/password";
import React from "react";
import { MyText } from "ui/text";
import css from "./index.css";

export function Password(props) {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Ingresar</MyText>
      </div>
      <PasswordComp></PasswordComp>
    </div>
  );
}
